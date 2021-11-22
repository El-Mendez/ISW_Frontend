import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { FiSend } from 'react-icons/fi';
import { RECEIVED_REQUEST, ACCEPT_REQUEST, CANCEL_REQUEST, SEARCH_IMG } from '../utils/rutas';

export default function FriendsNotifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [reload, setReload] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [image, setImage] = useState(false);
  const [requests, setRequests] = useState(false);
  const cookies = new Cookies();
  const { url } = useRouteMatch();
  const token = cookies.get('session');
  function onClick() {
    setShowNotifications(!showNotifications);
  }
  function acceptRequest(e) {
    e.preventDefault();
    e.stopPropagation();
    const request = async () => {
      try {
        await Axios.post(ACCEPT_REQUEST,
          {
            carne: e.target.value,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setReload(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function cancelRequest(e) {
    e.preventDefault();
    e.stopPropagation();
    const request = async () => {
      try {
        await Axios.post(CANCEL_REQUEST,
          {
            carne: e.target.value,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setReload(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function receivedRequests() {
    const request = async () => {
      try {
        const res = await Axios.get(RECEIVED_REQUEST,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setRequestList(res.data);
        if (res.data[0] === undefined) {
          setRequests(false);
        } else {
          setRequests(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function loadImage(user) {
    // eslint-disable-next-line no-unused-expressions
    const img = new Image();

    img.onload = () => {
      // image exists and is loaded
      setImage(true);
    };
    img.onerror = () => {
      // image exists and is loaded
      setImage(false);
    };

    img.src = `${SEARCH_IMG}/${user.carne}.png`;
    return img;
  }
  useEffect(() => {
    receivedRequests();
  }, [reload]);
  if (requests) {
    return (
      <div className="notification">
        {!showNotifications ? (
          <button className="circle" onClick={onClick} type="button">
            <FiSend className="message" />
          </button>
        ) : null}
        {showNotifications ? (
          <div className="box">
            <button className="buttonClose" type="button" onClick={onClick}>X</button>
            <div className="containerNotifications container">
              {requestList.map((user) => (
                <Link to={`${url}/profile/${user.carne}`} className="col-6" key={user.carne}>
                  <div key={user.carne} className="row notifications">
                    <div className="col-1 random" />
                    {/* <div className="image col-4">
                      <span className="material-icons">
                        account_circle
                      </span>
                    </div> */}
                    <div className="image-container" style={{ width: '30%' }}>
                      <img src={`${SEARCH_IMG}/${loadImage(user) ? `${user.carne}.png` : 'default.svg'}`} className="image-top rounded-circle" alt="Profile" />
                    </div>
                    <div className="datos col">
                      <div className="row">
                        {user.nombre}
                      </div>
                      <div className="row buttons">
                        <button value={user.carne} className="button col-6" type="button" onClick={acceptRequest}>Aceptar</button>
                        <button value={user.carne} className="button col-6" type="button" onClick={cancelRequest}>Rechazar</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}

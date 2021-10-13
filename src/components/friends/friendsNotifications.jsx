import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { FiSend } from 'react-icons/fi';
import history from '../utils/history';
import { RECEIVED_REQUEST } from '../utils/rutas';

export default function FriendsNotifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [requests, setRequests] = useState(false);
  const cookies = new Cookies();
  const { url } = useRouteMatch();
  const token = cookies.get('session');
  function onClick() {
    setShowNotifications(!showNotifications);
  }
  function showProfile(item) {
    history.push(`${url}/profile`);
    history.go();
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
  useEffect(() => {
    receivedRequests();
  }, []);
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
                <div key={user.carne} className="row notifications">
                  <div className="image col-6">
                    <span className="material-icons">
                      account_circle
                    </span>
                  </div>
                  <div className="datos col">
                    <div className="row">
                      {user.nombre}
                    </div>
                    <div className="row buttons">
                      <button className="button col-6 " type="button" onClick={showProfile}>Aceptar</button>
                      <button className="button col-6 " type="button">Rechazar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}

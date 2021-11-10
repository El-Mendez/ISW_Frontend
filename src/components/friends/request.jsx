/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { RECEIVED_REQUEST, SENT_REQUESTS } from '../utils/rutas';
import NoFriends from './noFriends';
import Card from '../utils/cardRequest';

function Request(props) {
  const [friendsList, setFriendsList] = useState([]);
  const [friends, setFriends] = useState(true);
  const [accept, setAccept] = useState(false);
  const item = props;
  const [type, setType] = useState(item.type);
  const [reload, setReload] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const location = useLocation();
  const { url } = useRouteMatch();

  function searchFriends1() {
    const request = async () => {
      try {
        const res = await Axios.get(RECEIVED_REQUEST,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setFriendsList(res.data);
        if (res.data[0] === undefined) {
          setFriends(false);
        } else {
          setFriends(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function searchFriends2() {
    const request = async () => {
      try {
        const res = await Axios.get(SENT_REQUESTS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setFriendsList(res.data);
        if (res.data[0] === undefined) {
          setFriends(false);
        } else {
          setFriends(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  useEffect(() => {
    if (item.type === 0) {
      searchFriends1();
    } else if (item.type === 1) {
      searchFriends2();
    }
    setType(item.type);
  }, [location, accept, reload]);
  return (
    <div className="userList">
      {(friends && item.type) ? (
        <div className="container ">
          <div className="card-container">
            {friendsList.map((user) => (
              <Card
                key={user.carne}
                name={user.nombre}
                    // TODO retornar carrera
                email={user.correo}
                carne={user.carne}
                viewProfile={`${url}/profile/${user.carne}`}
                setReload={() => setReload()}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container noFriends">
          <NoFriends />
        </div>
      )}
    </div>
  );
}

export default Request;

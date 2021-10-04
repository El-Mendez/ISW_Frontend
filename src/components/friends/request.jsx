import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { RECEIVED_REQUEST } from '../utils/rutas';
import FriendsItems from './friendsItems';
import NoFriends from './noFriends';

function Request(props) {
  const [friendsList, setFriendsList] = useState([]);
  const [friends, setFriends] = useState(true);
  const [accept, setAccept] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const item = props;
  const location = useLocation();
  function searchFriends() {
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
  useEffect(() => {
    searchFriends();
  }, [location, accept]);
  return (
    <div className="userList">
      {friends ? (
        <div className="container ">
          <div className="row align-items-center">
            {friendsList.map((user) => (
              <FriendsItems
                nombre={user.usuario_envia}
                apellido=""
                carne={user.usuario_envia}
                setAccept={setAccept}
                key={user.usuario_envia}
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

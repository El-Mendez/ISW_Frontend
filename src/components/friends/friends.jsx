import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { GET_FRIENDS } from '../utils/rutas';
import Card from '../utils/cardFriends';
import NoFriends from './noFriends';

function Friends() {
  const [friendsList, setFriendsList] = useState([]);
  const [friends, setFriends] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const { url } = useRouteMatch();
  const location = useLocation();
  function searchFriends() {
    const request = async () => {
      try {
        const res = await Axios.get(GET_FRIENDS,
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
  }, [location]);
  return (
    <div className="userList">
      {friends ? (
        <div className="container mt-4">
          <div className="card-container horizontal">
            {friendsList.map((user) => (
              <Card
                key={user.carne}
                name={user.nombre}
                career={user.carrera}
                email={user.correo}
                carne={user.carne}
                viewProfile={`${url}/profile/${user.carne}`}
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

export default Friends;

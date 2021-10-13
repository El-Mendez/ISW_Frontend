import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { GET_FRIENDS } from '../utils/rutas';
import SuggestionItem from '../suggestions/suggestionItem';
import NoFriends from './noFriends';
import { NavItem } from 'react-bootstrap';

function Friends(props) {
  const [friendsList, setFriendsList] = useState([]);
  const [friends, setFriends] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const item = props;
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
        <div className="container ">
          <div className="row align-items-center">
            {friendsList.map((user) => (
              <SuggestionItem
                nombre={user.nombre}
                carne={user.carne}
                correo={user.correo}
                key={user.carne}
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

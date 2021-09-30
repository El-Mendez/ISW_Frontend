import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SUGGESTIONS_HOBBIES, SUGGESTIONS_COURSES } from '../utils/rutas';
import SuggestionItem from '../suggestions/suggestionItem';
import NoFriends from './noFriends';

function Friends(props) {
  const [friendsList, setFriendsList] = useState([]);
  const requests = [SUGGESTIONS_COURSES, SUGGESTIONS_HOBBIES];
  const [friends, setFriends] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const item = props;
  const location = useLocation();
  function searchFriends() {
    const request = async () => {
      try {
        const res = await Axios.get(requests[item.type],
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setFriendsList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  useEffect(() => {

  }, [location]);
  return (
    <div className="userList">
      {friends ? (
        <div className="container ">
          <div className="row align-items-center">
            {friendsList.map((user) => (
              <SuggestionItem
                nombre={user.nombre}
                apellido={user.apellido}
                carne={user.carne}
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

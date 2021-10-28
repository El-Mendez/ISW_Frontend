import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SUGGESTIONS_HOBBIES, SUGGESTIONS_COURSES, SUGGESTIONS_FRIENDS } from '../utils/rutas';
import SuggestionItem from '../suggestions/suggestionItem';
import NoSuggestionItem from '../suggestions/noSuggestionItem';

function Search(props) {
  const [suggestions, setSuggestions] = useState([]);
  const requests = [SUGGESTIONS_COURSES, SUGGESTIONS_HOBBIES, SUGGESTIONS_FRIENDS];
  const [recommendation, setRecommendation] = useState(false);
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
        setSuggestions(res.data);
        if (res.data[0] === undefined) {
          setRecommendation(false);
        } else {
          setRecommendation(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  useEffect(() => {
    // Esto es probicional hasta que tenga la API de las recomendaciones por amigos
    searchFriends();
  }, [location]);
  return (
    <div className="userList">
      {recommendation ? (
        <div className="container ">
          <div className="row align-items-center">
            {suggestions.map((user) => (
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
        <div className="container noSuggestions">
          <NoSuggestionItem />
        </div>
      )}
    </div>
  );
}

export default Search;

import React, { useState, useEffect } from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
import {SUGGESTIONS, AUTH} from "../utils/rutas";
import Cookies from 'universal-cookie';
import Axios from "axios";
import SuggestionItem from '../suggestions/suggestionItem';
import UserInfo from '../data/userInfo';

function Search(props) {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const token = cookies.get('session')
  const [suggestions, setSuggestions] = useState([]);
  function searchFriends(){
    const request = async () => {
      try {
        const res = await Axios.get(SUGGESTIONS,
          {
              headers:{
                  Authorization: `Bearer ${token}`
              }
          }
      );
        console.log(res.data)
        setSuggestions(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    request();
  };
  useEffect(()=>{
    searchFriends()
}, [])
  return (
    <div className="userList">
      <div className="container ">
        <div className="row align-items-center">
          {suggestions.map((user) => (
            <SuggestionItem 
            nombre = {user.nombre}
            apellido = {user.apellido}
            carne = {user.carne}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;

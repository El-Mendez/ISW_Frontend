import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import history from '../utils/history';
import { USER_INFO_AUT } from '../utils/rutas';

function Services() {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const token = cookies.get('session');
  const [user, setUser] = useState('user');

  // TODO utilizar proptypes

  function logout() {
    cookies.remove('session', { path: '/' });
    history.push('/');
    history.go();
  }
  function searchFriends() {
    const request = async () => {
      try {
        const res = await Axios.get(USER_INFO_AUT,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setUser(res.data[0].nombre_completo.split(' ', 1));
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  useEffect(() => {
    searchFriends();
  }, []);
  return (
    <div className="d-flex align-items-center ">
      <div className="services container align-items" style={{ height: '28px' }}>
        <div className="row dropdown">
          <div className="row">
            <span className="material-icons col-4 float-left">
              account_circle
            </span>
            <div className="col-8">
              {user}
            </div>
          </div>
          <div className="row">
            <div className="dropdown-content container">
              <Link to={`${url}/profile`} className="noDecorations">
                <p className="row">Cuenta</p>
              </Link>
              <a className="noDecorations" onClick={logout}>
                <p className="row">Cerrar sesion</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Services;

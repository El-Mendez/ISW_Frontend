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
  const [user, setUser] = useState({
    nombre: '',
    carne: 0,
  });
  const [image, setImage] = useState(false);
  const img = new Image();

  // TODO utilizar proptypes

  function logout() {
    cookies.remove('session', { path: '/' });
    history.push('/');
    history.go();
  }
  function searchFriends() {
    const request = async () => {
      try {
        const { data } = await Axios.get(USER_INFO_AUT,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setUser({
          nombre: data[0].nombre_completo.split(' ', 1),
          carne: data[0].carne,
        });
        img.src = `http://meetinguvg.me/public/assets/${data[0].carne}.png`;
        // eslint-disable-next-line no-unused-expressions
        img.onload = function () {
          // image exists and is loaded
          setImage(true);
        };
        img.onerror = function () {
          // image exists and is loaded
          setImage(false);
        };
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
    <div className="d-flex me-lg-8 me-5">
      <div className="services align-items-end align-self-lg-center">
        <div className="d-flex align-items-center">
          <div className={`${!image ? ('no-image-user col-4') : 'col-2 image-user align-self-center'} me-2`}>
            <img src={`http://meetinguvg.me/public/assets/${image ? `${user.carne}.png` : 'default.svg'}`} alt="Profile" className="rounded-circle profile-img" />
          </div>
          <div className="dropdown">
            <button id="account-name" type="button" className="nav-link button">{user.nombre}</button>
            <div id="getRequests" className="dropdown-content container">
              <Link id="account" to={`${url}/profile`} className="noDecorations">
                <p className="row">Cuenta</p>
              </Link>
              <a id="close-session" className="noDecorations" onClick={logout}>
                <p className="row">Cerrar sesión</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Services;

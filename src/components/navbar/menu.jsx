import React, { useState } from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import Help from '../help/helpModal';

export default function Menu() {
  const [message, setMessage] = React.useState(false);
  const { url } = useRouteMatch();
  return (
    <div className="products">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/profile`} className="noDecorations">
            <button className="nav-link button" type="button">
              Perfil
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/search`} className="noDecorations">
            <button className="nav-link button" type="button">
              Buscar amigos
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <button className="nav-link button" type="button" onClick={() => setMessage(true)}>
            Ayuda
          </button>
        </li>
      </ul>
    </div>

  );
}

import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Menu() {
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
          <Link to={`${url}/friends`} className="noDecorations">
            <button className="nav-link button" type="button">
              Ver amigos
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <div className="dropdown">
            <button type="button" className="nav-link button">Bandeja de entrada</button>
            <div className="dropdown-content container">
              <Link to={`${url}/get_request`} className="noDecorations">
                <p className="row">Solicitudes recibidas</p>
              </Link>
              <Link to={`${url}/sent_request`} className="noDecorations">
                <p className="row">Solicitudes enviadas</p>
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item product-font ml-20">
          <div className="dropdown">
            <button type="button" className="nav-link button">Recomendaciones</button>
            <div className="dropdown-content container">
              <Link to={`${url}/search/courses`} className="noDecorations">
                <p className="row">Por cursos en común</p>
              </Link>
              <Link to={`${url}/search/hobbies`} className="noDecorations">
                <p className="row">Por hobbies en común</p>
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>

  );
}

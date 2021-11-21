import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Menu() {
  const { url } = useRouteMatch();
  return (
    <div>
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
            <button id="friends" className="nav-link button" type="button">
              Ver amigos
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <div className="dropdown">
            <button id="mailBox" type="button" className="nav-link button">Bandeja de entrada</button>
            <div id="getRequests" className="dropdown-content container">
              <Link id="sentRequest" to={`${url}/sent_request`} className="noDecorations">
                <p className="row">Solicitudes enviadas</p>
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item product-font ml-20">
          <div className="dropdown">
            <button id="recommendations" type="button" className="nav-link button">Recomendaciones</button>
            <div className="dropdown-content container">
              <Link id="coursesRecommendations" to={`${url}/search/courses`} className="noDecorations">
                <p className="row">Por cursos en común</p>
              </Link>
              <Link id="hobbiesRecommendations" to={`${url}/search/hobbies`} className="noDecorations">
                <p className="row">Por hobbies en común</p>
              </Link>
              <Link id="mutualRecommendations" to={`${url}/search/friends`} className="noDecorations">
                <p className="row">Por amigos en común</p>
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/search`} className="noDecorations">
            <button id="friends" className="nav-link button" type="button">
              Buscar usuarios
            </button>
          </Link>
        </li>
      </ul>
    </div>

  );
}

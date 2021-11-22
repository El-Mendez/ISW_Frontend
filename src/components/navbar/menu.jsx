import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Menu() {
  const { url } = useRouteMatch();
  return (
    <div style={{ height: '100%' }}>
      <ul className="menu navbar-nav mr-auto mt-lg-0 d-flex align-items-center">
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/friends`} className="noDecorations">
            <button id="friends" className="nav-link button" type="button">
              Ver amigos
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/sent_request`} className="noDecorations">
            <button id="sentRequest" className="nav-link button" type="button">
              Solicitudes enviadas
            </button>
          </Link>
        </li>
        <li id="notification" className="nav-item product-font ml-20">
          <Link to={`${url}/recieved_request`} className="noDecorations">
            <button id="friends" className="nav-link button" type="button">
              Socilicitudes de amistad
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <div className="dropdown prueba">
            <button id="recommendations" type="button" className="nav-link button">Recomendaciones</button>
            <div id="recomendations2" className="dropdown-content container" style={{ width: '170px', right: '-2rem' }}>
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
            <button id="search" className="nav-link button" type="button">
              Buscar usuarios
            </button>
          </Link>
        </li>
      </ul>
    </div>

  );
}

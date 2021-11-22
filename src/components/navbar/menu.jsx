import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Help from '../utils/helpModal';

export default function Menu() {
  const { url } = useRouteMatch();
  const [help, setHelp] = React.useState(false);
  return (
    <div>
      <ul className="navbar-nav mr-auto mt-lg-0">
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/friends`} className="noDecorations">
            <button id="friends" className="nav-link button" type="button">
              Ver amigos
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <Link to={`${url}/sent_request`} className="noDecorations">
            <button id="friends" className="nav-link button" type="button">
              Solicitudes enviadas
            </button>
          </Link>
        </li>
        <li className="nav-item product-font ml-20">
          <div className="dropdown">
            <button id="recommendations" type="button" className="nav-link button">Recomendaciones</button>
            <div className="dropdown-content container" style={{ width: '170px', right: '-2rem' }}>
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
          <button id="friends" className="nav-link button" type="button" onClick={() => setHelp(true)}>
            Ayuda
          </button>
        </li>
        <Help
          show={help}
          onHide={() => setHelp(false)}
        />
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

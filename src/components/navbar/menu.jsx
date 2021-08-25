import React, { useState } from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import Help from '../help/helpModal';

export default function Menu(props) {
  const [message, setMessage] = React.useState(false);
  const { url } = useRouteMatch();
  const item = props;
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
          <button className="nav-link button" type="button" onClick={item.openWindowSuggestions}>
            Recomendaciones
          </button>
        </li>
        {item.suggestionsOptions && <div className='suggestionsOptions container '> 
                      <div className='cuadrado2 row container'>
                        <Link to={`${url}/search/courses`} className="noDecorations">
                          <p className='row'>Por cursos en común</p>
                        </Link>
                        <Link to={`${url}/search/hobbies`} className="noDecorations">
                          <p className='row'>Por hobbies en común</p>
                        </Link>
                      </div>
                      </div>}
        <li className="nav-item product-font ml-20">
          <button className="nav-link button" type="button" onClick={() => setMessage(true)}>
            Ayuda
          </button>
        </li>
      </ul>
    </div>

  );
}

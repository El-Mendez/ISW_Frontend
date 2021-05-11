import React from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';
import { createBrowserHistory as history } from 'history';

function Perfil(props) {
  const { url } = useRouteMatch();
  let hobby = '';
  let item = props;

  const handleHobby = (e) => {
    console.log(e.target.value);
    hobby = e.target.value;
  };

  const handleClick = () => {
    console.log(item.hobby)
    history().push(`${url}/recomendaciones/${hobby}`);
    history().go();
  };

  return (
    <div className="busqueda">
      <div className="container">
        <div className="row align-items-center">
          <h1>Ingresa un hobby para poder encontrar amigos</h1>
        </div>
        <div className="row align-items-center justify-content-center buscar">
          <div className="col-8">
            <form>
              <input type="text" className="search" placeholder="Buscar.." onChange={handleHobby} />
            </form>
          </div>
          <div className="col-2 botonBuscar">
            <button onClick={handleClick}>
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;

import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import history from '../utils/history';

function Services(props) {
  const { url } = useRouteMatch();
  const cookies = new Cookies();

  // TODO utilizar proptypes
  const item = props;

  function logout() {
    cookies.remove('session')
    setTimeout(() => {
      history.push('/');
      history.go();
    },200)
  }
  return (
    <div className="d-flex align-items-center ">
      <div className="services container align-items" style={{ height: '28px'}}>
        <div className="row dropdown">
          <div className="row">
            <span className="material-icons col-4 float-left" onClick={item.openWindow}>
              account_circle
            </span>
            <div className="col-8" onClick={item.openWindow}>
              User
            </div>
          </div>
          <div className="row">
            <div className="dropdown-content container">
            <Link to={`${url}/profile`} className="noDecorations">
                <p className='row'>Cuenta</p>
              </Link>
            <a className="noDecorations" onClick={logout}>
              <p className='row' onClick={item.logout}>Cerrar sesion</p>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Services;

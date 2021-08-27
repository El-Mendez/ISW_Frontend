import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import history from '../history';

function Services(props) {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const item = props;
  function logout() {
    cookies.remove('session')
    setTimeout(() => {
      history.push('/');
      history.go();
    },200)
  }
  return (
    <div className="d-flex align-items-center">
      <div className="services container align-items" style={{ height: '28px'}}>
        <div className="row ">
          <span className="material-icons col-4 float-left" onClick={item.openWindow}>
            account_circle
          </span>
            <div className="col-8" onClick={item.openWindow}>
              User
            </div>
        </div>
      </div>
            {item.show && <div className='contenedor container '>
                        <div className='triangle row'></div>
                        <div className='cuadrado row container'>
                          <p className='row'>Cuenta</p>
                          <p className='row' onClick={logout}>Cerrar sesion</p>
                        </div>
                      </div>}
    </div>

  );
}

export default Services;

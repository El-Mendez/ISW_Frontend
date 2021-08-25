import React from 'react';
import user from '../../assets/user.png';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import history from '../history';

function Services(props) {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const item = props;
  function logout() {
    cookies.remove('session')
    history.push(`/`);
    history.go();
  }
  return (
    <div className="d-flex align-items-center">
      {/* <Link to="/" className="noDecorations">
        <div className="services " style={{ height: '24px' }} onClick={logout}>
          <span className="material-icons">
            directions_run
          </span>
        </div>
      </Link> */}
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

      {/* User image profile */}
      {/* <div className="services mt-1">
        <img src={user} alt="User profile" width="32px" height="32px" className="rounded-circle" />
      </div> */}
    </div>

  );
}

export default Services;

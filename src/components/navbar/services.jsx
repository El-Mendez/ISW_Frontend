import React from 'react';
import user from '../../assets/user.png';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import history from '../history';

function Services() {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const [show, setShow] = React.useState(true);
  function logout() {
    cookies.remove('session')
    history.push(`/`);
    history.go();
  }
  function openWindow() {
    setShow(!show)
    console.log(show)
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
          <span class="material-icons col-4 float-left" onClick={openWindow}>
            account_circle
          </span>
            <div className="col-8" onClick={openWindow}>
              Pepe 
            </div>
        </div>
      </div>
            {show && <div class='contenedor container '> 
                        <div class='triangle row'></div>
                        <div class='cuadrado row container'>
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

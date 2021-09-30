import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Login from './login';

function NavBar() {
  const { url } = useRouteMatch();

  const [login, setLogin] = React.useState(false);

  return (
    <div>
      {/* NavBar menu */}
      <div
        className=""
        style={{
          opacity: 0.85,
          height: '90px',
        }}
      >
        <nav className="navbar navbar-expand-sm navbar-light text-light">
          <div className="d-flex flex-grow-1 justify-content-between align-items-center" style={{ height: 'inherit' }}>
            {/* LOGO */}
            <Link to={`${url}`} aria-label="Google store logo" className="logo-container">
              <img src={logo} alt="Logo" className="img-size" />
            </Link>
            <div className="d-flex">
              <button className="sub-1 me-3 start-link button-styless" onClick={() => setLogin(true)} type="button">Iniciar sesión</button>
              <div className="border-end border-primary" style={{ height: '20px' }} />
              <Link className="sub-1 ms-3 start-link" to="/signUp">Registrarse</Link>
            </div>
          </div>
        </nav>
      </div>
      <Login
        show={login}
        onHide={() => setLogin(false)}
      />
    </div>

  );
}

export default NavBar;

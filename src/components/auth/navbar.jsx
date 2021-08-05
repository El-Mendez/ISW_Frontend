import React from 'react';
import logo from '../../assets/logo.svg';
import { Link, useRouteMatch } from 'react-router-dom';
import Login from "./Login";
import ModalRegister from "./modalRegister";

function NavBar() {
  const { url } = useRouteMatch();

  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);

  return (
      <div>
        {/* NavBar menu */}
        <div className={'bg-secondary fixed-top'}>
          <div style={{ height: '72px' }}>
            <nav className="navbar navbar-expand-lg navbar-light text-light">
              <button
                  className="navbar-toggler mr-3"
                  type="button"
                  data-toggle="collapse"
                  data-target="#products"
                  aria-controls="products"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
              <span className="material-icons">
                menu
              </span>
              </button>
              <div className="d-flex flex-grow-1 justify-content-between align-items-center" style={{ height: 'inherit' }}>
                {/* LOGO */}
                <Link to={`${url}`} aria-label="Google store logo" className="logo-container">
                    <img src={logo} alt="Logo" className="img-size"/>
                </Link>
                <div className="d-flex">
                  <a className="sub-1 me-3 start-link" onClick={() => setLogin(true)}>Iniciar sesión</a>
                  <div className="border-end border-primary" style={{height: '20px'}}/>
                  <a className="sub-1 ms-3 start-link" onClick={() => setRegister(true)}>Registrarse</a>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <Login
            show={login}
            onHide={() => setLogin(false)}
        />
          <ModalRegister
              show={register}
              onHide={() => setRegister(false)}
          />
      </div>

  );
}

export default NavBar;

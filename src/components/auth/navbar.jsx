import React from 'react';
import logo from '../../assets/logo.svg';
import { Link, useRouteMatch } from 'react-router-dom';
import Login from "./login";
import history from "../history";

function NavBar() {
  const { url } = useRouteMatch();

  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);

  const handleClick = () => {
    history.push(`/signUp`);
    history.go();
  }

  return (
      <div>
        {/* NavBar menu */}
        <div className={'bg-transparent fixed-top'} style={{opacity: 0.85,
            height: '90px'}}>
            <nav className="navbar navbar-expand-sm navbar-light text-light">
              <div className="d-flex flex-grow-1 justify-content-between align-items-center" style={{ height: 'inherit' }}>
                {/* LOGO */}
                <Link to={`${url}`} aria-label="Google store logo" className="logo-container">
                    <img src={logo} alt="Logo" className="img-size"/>
                </Link>
                <div className="d-flex">
                  <a className="sub-1 me-3 start-link" onClick={() => setLogin(true)}>Iniciar sesión</a>
                  <div className="border-end border-primary" style={{height: '20px'}}/>
                  <a className="sub-1 ms-3 start-link" onClick={handleClick}>Registrarse</a>
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

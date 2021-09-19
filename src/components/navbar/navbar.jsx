import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Menu from './menu';
import Services from './services';
import logo from '../../assets/logo.svg';

export default function NavBar() {
  const { url } = useRouteMatch();

  // TODO revisar el uso de estados
  const [show, setShow] = useState(false);
  const [suggestionsOptions, setSuggestionsOptions] = useState(false);

  return (
    <div>
      {/* NavBar menu */}
      <div className="navbar-container bg-secondary navbar-fixed-top">
        <div style={{ height: '56px' }}>
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
              <Link to={`${url}`} style={{ height: '24px' }} aria-label="Google store logo">
                <div className="logo-bg-large">
                  <img src={logo} alt="Logo" className="temporary-style" />
                </div>
              </Link>
              <div className="collapse navbar-collapse align-items-center" style={{ height: 'inherit' }}>
                <Menu
                  suggestionsOptions={suggestionsOptions}
                  openWindowSuggestions={() => { setSuggestionsOptions(!suggestionsOptions); }}
                />
              </div>
              <Services
                show={show}
                openWindow={() => { setShow(!show); }}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>

  );
}

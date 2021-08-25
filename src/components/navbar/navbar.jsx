import React, { useState, useEffect } from 'react';
import Menu from './menu';
import Services from './services';
import logo from '../../assets/logo.svg';
import { Link, useRouteMatch, useParams } from 'react-router-dom';

function NavBar() {
  const { url } = useRouteMatch();
  // Scroll position
  // @author: rbk
  // Extraido y adaptado de: https://codesandbox.io/s/useeffect-scroll-event-oolh6?from-embed=&file=/src/index.js
  const [fixed, setFixed] = useState(false);
  const [show, setShow] = React.useState(false);
  function openWindow() {
    setShow(!show)
  }
  const [suggestionsOptions, setSuggestionsOptions] = React.useState(true);
  function openWindowSuggestions() {
    setSuggestionsOptions(!suggestionsOptions)
  }
  function logit() {
    const scrollY = window.pageYOffset;
    if (scrollY >= 56) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }
  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });

  return (
    <div>
      {/* NavBar menu */}
      <div className={'navbar-container bg-secondary navbar-fixed-top'}>
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
                  <img src={logo} alt="Logo" className="temporary-style"/>
                </div>
              </Link>
              <div className="collapse navbar-collapse align-items-center" style={{ height: 'inherit' }}>
                <Menu 
                suggestionsOptions = {suggestionsOptions}
                openWindowSuggestions = {openWindowSuggestions}/>
              </div>
                <Services 
                show = {show}
                openWindow = {openWindow}
                />
            </div>
          </nav>
        </div>
      </div>
    </div>

  );
}

export default NavBar;

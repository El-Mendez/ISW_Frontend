import React from 'react';
import user from '../../assets/user.png';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import history from '../history';

function Services() {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  function logout() {
    cookies.remove('session')
    history.push(`/`);
    history.go();
  }
  return (
    <div className="d-flex align-items-center">
      {/* Search */}
      <div className="services" style={{ height: '24px' }}>
        <span className="material-icons">
          search
        </span>
      </div>
      {/* Help */}
      <div className="services " style={{ height: '24px' }}>
        <span className="material-icons">
          help
        </span>
      </div>
      <Link to="/" className="noDecorations">
        <div className="services " style={{ height: '24px' }} onClick={logout}>
          <span className="material-icons">
            directions_run
          </span>
        </div>
      </Link>

      {/* User image profile */}
      <div className="services mt-1">
        <img src={user} alt="User profile" width="32px" height="32px" className="rounded-circle" />
      </div>
    </div>

  );
}

export default Services;

import React from 'react';
import user from '../../assets/user.png';

function Services() {
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
      {/* User image profile */}
      <div className="services mt-1">
        <img src={user} alt="User profile" width="32px" height="32px" className="rounded-circle" />
      </div>
    </div>

  );
}

export default Services;

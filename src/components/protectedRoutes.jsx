import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProtectedRoutes({ session, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (session
        ? (
          <Component />
        )
        : (
          <Redirect to={
                        {
                          pathname: '/',
                        }
                    }
          />
        ))}
    />
  );
}

ProtectedRoutes.propTypes = {
  session: PropTypes.bool,
};

ProtectedRoutes.defaultProps = {
  session: false,
};

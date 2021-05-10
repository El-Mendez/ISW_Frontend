import React from 'react';
import LoginFormContainer from './loginFormcontainer';

function Login() {
  return (
    <div className="d-flex justify-content-around bg-secondary vw-100 h-100">
      <LoginFormContainer />
      {/* <img src={test} className={'ml-5 d-none d-lg-block'}/> */}
    </div>
  );
}

export default Login;

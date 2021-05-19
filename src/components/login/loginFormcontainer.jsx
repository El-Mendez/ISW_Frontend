import React from 'react';
import history from '../utils/history';
import LoginForm from './loginForm';


function LoginFormContainer() {
  const handleClick = () => {
    history.push('/signUp');
    history.go();
  };

  return (

    <div className="form-container d-flex flex-column mb-5">

      {/* <img src={logo} className={'align-self-center w-50'}/> */}

      <h4 className="text-center font-weight-bold mt-3">Meeting la mejor aplicación para hacer amigos</h4>

      <span className="divider">○</span>

      <LoginForm />

      <span className="divider" />

      <p className="text-center mb-0 mt-1">

        <button className="btn btn-meeting w-75%" onClick={handleClick}>¿Has olvidado tu contraseña?</button>

        <button className="btn btn-meeting w-75%" onClick={handleClick}>¿Aún no tienes una cuenta?</button>

      </p>

    </div>

  );
}

export default LoginFormContainer;

import React from 'react';
import RegisterForm from './registerForm';
import history from '../history';

function RegisterFormContainer() {
  const handleClick = () =>{
    history.push('/');
    history.go();
  };

  return(
    <div className={'form-container d-flex flex-column mb-5'}>
      {/*<img src={logo} className={'align-self-center w-50'}/>*/}
      <h4 className={'text-center font-weight-bold mt-3'}>Regístrate gratis, y haz nuevos amigos</h4>
      <span className={'divider'}>○</span>
      <RegisterForm/>
      <span className={'divider'}/>
      <p className={'text-center mb-0 mt-1'}>
                <span className={'mr-3'}>
                   ¿Ya tienes cuenta?
                </span>
        <button className='btn btn-meeting w-75%' onClick={handleClick}>Iniciar Sesión</button>
      </p>
    </div>
  )
}

export default RegisterFormContainer;

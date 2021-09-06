import React from 'react';
import logo from '../../assets/logo.svg';

export default function ForgotPasswordMessage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={logo} alt="Logo" className="img-size w-50" />
      <h1 className="mt-2 text-center">Restablecimiento de contraseña</h1>
      <p className="text-center poppins-font">Te hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.</p>
    </div>
  );
}

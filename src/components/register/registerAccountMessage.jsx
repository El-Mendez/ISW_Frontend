import React from 'react';
import logo from '../../assets/logo.svg';

export default function RegisterAccountMessage() {
  return (
    <div className="vh-100 d-flex align-content-center justify-content-center bg-beige">
      <div className="forgot-password-container mx-4">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={logo} alt="Logo" className="img-size w-50" />
          <h1 className="mt-2 text-center">Confirmación de cuenta</h1>
          <p className="text-center poppins-font">
            Para garantizar tu identidad, te hemos enviado un correo eléctronico
            con el que podrás confirmar tu cuenta. No te detengas, estas a un solo click de hacer
            nuevos amigos.
          </p>
        </div>
      </div>
    </div>
  );
}

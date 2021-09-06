import React from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import logo from '../../assets/logo.svg';
import history from '../utils/history';
import { ACCEPT_ACCOUNT_REQUEST } from '../utils/rutas';

// Obtiene el token de la URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ConfirmAccount() {
  const query = useQuery();
  const cookies = new Cookies();

  const acceptAccountRequest = async () => {
    try {
      const { data } = await Axios.post(ACCEPT_ACCOUNT_REQUEST,
        {},
        {
          headers: {
            Authorization: `Bearer ${query.get('token')}`,
          },
        });
      cookies.set('session', data.token, { path: '/' });
      setTimeout(() => {
        history.push('/data');
        history.go();
      }, 500);
      //    Modificar el delay de paso a otra pagina
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    acceptAccountRequest();
  };

  return (
    <div className="vh-100 d-flex align-content-center justify-content-center bg-beige">
      <div className="forgot-password-container mx-4">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={logo} alt="Logo" className="img-size w-50" />
          <h1 className="mt-2 text-center">Confirmar tu cuenta</h1>
          <p className="text-center poppins-font">Estas a un solo paso de poder hacer nuevos amigos. Da click en el boton de abajo para terminar de configurar tu cuenta</p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button onClick={handleClick} className="btn-fill w-50" type="button">CONTINUAR</button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import { PASSWORD_RESET } from '../utils/rutas';

// Validación de datos ingresados por el usuario
const schema = z.object({
  carne: z.string().nonempty({ message: 'Ingresa tu carné' }).min(3, { message: 'Mínimo 3 caracteres' }),
});

export default function ForgotPasswordForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const [user, setUser] = useState({
    carne: '',
  });

  const [filled, setFilled] = useState({
    carne: false,
  });

  // Envía la información del usuario a la base de datos
  // Retorna error si el carné ya está guardado o no se pasaron todos los parámetros
  function resetPassword() {
    console.log('Loading...');
    const fetchData = async () => {
      try {
        await Axios.post(PASSWORD_RESET,
          {
            carne: user.carne,
          });
      } catch (error) {
        console.log(error);
        alert('El carné ingresado no se encuentra registrado');
      }
    };
    fetchData();
  }

  // Actualiza los estados a medida que el usuario escribe
  const handleInputChange = (e) => {
    console.log(e.target.name);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    if (e.target.value !== '') {
      setFilled({
        ...filled,
        [e.target.name]: true,
      });
    } else {
      setFilled({
        ...filled,
        [e.target.name]: false,
      });
    }
  };

  const onSubmit = () => {
    resetPassword();
    setTimeout(() => { props.handleClick(); }, 1000);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={logo} alt="Logo" className="img-size w-50" />
        <h1 className="mt-2 text-center">Restablecimiento de contraseña</h1>
        <p className="text-center poppins-font">
          Pon tu número de carné que usaste para registrarte.
          Te enviaremos un correo con un enlace para restablecer tu contraseña.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Carné */}
        <div className="input-container">
          <span className={`material-icons input-icon ${filled.carne ? 'is-filled' : ' '}`}>
            assignment_ind
          </span>
          <input
            className="input ms-1"
            type="number"
            name="carne"
            placeholder="Carné"
            onInput={handleInputChange}
            {...register('carne')}
          />
        </div>
        <small className="text-danger text-small d-block mb-2 mt-1">
          <div className="d-flex align-items-center ps-2">
            {errors.carne
              ? <span className="material-icons me-1">error_outline</span>
              : null}
            {errors.carne?.message}
          </div>
        </small>
        {/* Send the reset password email button */}
        {/* Cancel the request of reset password */}
        <div className="d-flex justify-content-end mt-4">
          <Link to="/" className="btn-fill me-2 link-design">CANCELAR</Link>
          <button onSubmit={onSubmit} className="ms-1 btn-fill" type="submit">ENVIAR</button>
        </div>
      </form>
    </>
  );
}

ForgotPasswordForm.propTypes = {
  handleClick: PropTypes.func,
};

ForgotPasswordForm.defaultProps = {
  handleClick() {
    console.log('Function not working');
  },
};

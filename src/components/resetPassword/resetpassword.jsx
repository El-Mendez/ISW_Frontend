import React, { useState } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import history from '../utils/history';
import { ACCEPT_PASSWORD_RESET } from '../utils/rutas';
import logo from '../../assets/logo.svg';

// Validación de contraseñas, que ambas sean iguales y que al menos sea de 8 caracteres
const schema = z.object({
  password: z.string().nonempty({ message: 'Ingrese un carné' }).min(8, { message: 'Mínimo 8 caracteres' })
    .regex(new RegExp('.*[A-Z].*'), 'Al menos una letra mayúscula')
    .regex(new RegExp('.*\\d.*'), 'Al menos un número')
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      'Al menos un caracter especial',
    ),
  confirm_password: z.string().nonempty({ message: 'Ingrese una contraseña' }).min(8, { message: 'Mínimo 8 caracteres' })
    .regex(new RegExp('.*[A-Z].*'), 'Al menos una letra mayúscula')
    .regex(new RegExp('.*\\d.*'), 'Al menos un número')
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      'Al menos un caracter especial',
    ),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Las contraseñas no son iguales',
  path: ['confirm_password'], // set path of error
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const query = useQuery();

  const [user, setUser] = useState({
    password: '',
    confirm_password: '',
  });

  const [filled, setFilled] = useState({
    password: false,
    confirm_password: false,
  });

  // Envía la información del usuario a la base de datos
  // Retorna error si el carné ya está guardado o no se pasaron todos los parámetros
  function acceptResetPassword() {
    const fetchData = async () => {
      try {
        await Axios.post(ACCEPT_PASSWORD_RESET,
          {
            newPassword: user.confirm_password,
          },
          {
            headers: {
              Authorization: `Bearer ${query.get('token')}`,
            },
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  // Actualiza los estados a medida que el usuario escribe
  const handleInputChange = (e) => {
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

  // Valida la información ingresada en el formulario y hace el request
  const onSubmit = () => {
    acceptResetPassword();
    setTimeout(() => {
      history.push('/');
      history.go();
    }, 1000);
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="forgot-password-container mx-3">
        <div className="d-flex align-items-center justify-content-center">
          <img src={logo} alt="Logo" className="img-size w-75" />
          <div className="border-end border-primary d-none d-sm-block" style={{ height: '35px', opacity: 0.7 }} />
          <p className="display-6 ms-3 mb-0 d-none d-sm-block" style={{ opacity: '0.8' }}>Cuenta</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Contraseña */}
          <div className="input-container">
            <span className={`material-icons input-icon ${filled.password ? 'is-filled' : ' '}`}>
              assignment_ind
            </span>
            <input
              className="input ms-1"
              type="password"
              name="password"
              placeholder="Nueva contraseña"
              onInput={handleInputChange}
              {...register('password')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.password
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.password?.message}
            </div>
          </small>
          {/* Confirm password */}
          <div className="input-container">
            <span className={`material-icons input-icon ${filled.confirm_password ? 'is-filled' : ' '}`}>
              lock
            </span>
            <input
              className="input ms-1"
              type="password"
              name="confirm_password"
              placeholder="Repite tu nueva contraseña"
              onInput={handleInputChange}
              {...register('confirm_password')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.confirm_password
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.confirm_password?.message}
            </div>
          </small>
          {/* Reset password button */}
          <div className="d-flex justify-content-end mt-4">
            <button onSubmit={onSubmit} className="btn-fill link-design" type="submit">RESTABLECER</button>
          </div>
        </form>
      </div>
    </div>
  );
}

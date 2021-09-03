import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import { SEARCH_CAREER, ACCOUNT_REQUEST } from '../utils/rutas';

// Validación de datos ingresados por el usuario
const schema = z.object({
  carne: z.string().min(3, { message: 'EL mínimo de un carné UVG es de 3 dígitos' }),
  correo: z.string().nonempty({ message: 'Ingrese su correo universitario' }).email({ message: 'Ingrese un correo válido' }),
  nombre: z.string().nonempty({ message: 'Ingresa un nombre' }),
  apellido: z.string().nonempty({ message: 'Ingresa un apellido' }),
  password: z.string().nonempty({ message: 'Ingrese una contraseña' }).min(8, { message: 'Mínimo 8 caracteres' }),
});

export default function RegisterForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const [result, setResult] = useState([]);

  const [user, setUser] = useState({
    carne: '',
    correo: '',
    nombre: '',
    apellido: '',
    carreraId: '',
    password: '',
  });

  const [filled, setFilled] = useState({
    carne: false,
    correo: false,
    nombre: false,
    apellido: false,
    password: false,
  });

  // Búsqueda de carreras por lo que ingrese el usuario
  function searchCareer() {
    const fetchData = async () => {
      try {
        const res = await Axios.get(SEARCH_CAREER);
        res.data.map((item) => (
          setResult((prevState) => [...prevState, { value: item.id, label: item.nombre }])
        ));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    searchCareer();
  }, []);

  // Envía la información del usuario a la base de datos
  // Retorna error si el carné ya está guardado o no se pasaron todos los parámetros
  function accountRequest() {
    const fetchData = async () => {
      try {
        await Axios.post(ACCOUNT_REQUEST,
          {
            carne: user.carne,
            correo: user.correo,
            nombre: user.nombre,
            apellido: user.apellido,
            carreraId: user.carreraId,
            password: user.password,
          });
        setTimeout(() => { props.handleClick(); }, 1000);
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 403) {
          alert('El carné ingresado ya está registrado');
          setUser({
            carne: '',
            correo: '',
            nombre: '',
            apellido: '',
            carreraId: '',
            password: '',

          });
        }
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

  const handleChange = (e) => {
    setUser({
      ...user,
      carreraId: e.value,
    });
  };

  // Valida la información ingresada en el formulario y hace el request
  const onSubmit = () => {
    accountRequest();
  };

  return (
    <>
      <div className="register-container mx-3" id="register-form">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="welcome">
            BIENVENIDO A
          </p>
          <img src={logo} alt="Logo" className="img-size w-50" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Carne */}
          <div className="input-container">
            <span className={`material-icons input-icon ${filled.carne ? 'is-filled' : ' '}`}>
              assignment_ind
            </span>
            <input
              className="input ms-1"
              type="number"
              name="carne"
              placeholder="Número de carné"
              onInput={handleInputChange}
              value={user.carne}
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
          {/* Correo */}
          <div className="input-container">
            <span className={`material-icons input-icon ${filled.correo ? 'is-filled' : ' '}`}>
              email
            </span>
            <input
              className="input ms-1"
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              onInput={handleInputChange}
              value={user.correo}
              {...register('correo')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.correo
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.correo?.message}
            </div>
          </small>
          {/* Nombre y Apellido */}
          <div className="row">
            {/* Nombre */}
            <div className="col">
              <div className="input-container">
                <span className={`material-icons input-icon ${filled.nombre ? 'is-filled' : ' '}`}>
                  person
                </span>
                <input
                  className="input ms-1"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  onInput={handleInputChange}
                  value={user.nombre}
                  {...register('nombre')}
                />
              </div>
              <small className="text-danger text-small d-block mb-2 mt-1">
                <div className="d-flex align-items-center ps-2">
                  {errors.nombre
                    ? <span className="material-icons me-1">error_outline</span>
                    : null}
                  {errors.nombre?.message}
                </div>
              </small>
            </div>
            {/* Apellido */}
            <div className="col">
              <div className="input-container">
                <span className={`material-icons input-icon ${filled.apellido ? 'is-filled' : ' '}`}>
                  person
                </span>
                <input
                  className="input ms-1"
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  onInput={handleInputChange}
                  value={user.apellido}
                  {...register('apellido')}
                />
              </div>
              <small className="text-danger text-small d-block mb-2 mt-1">
                <div className="d-flex align-items-center ps-2">
                  {errors.apellido
                    ? <span className="material-icons me-1">error_outline</span>
                    : null}
                  {errors.apellido?.message}
                </div>
              </small>
            </div>
          </div>
          {/* Carrera */}
          {/* Hacer validación para que seleccione una carrera y se limpie la casilla */}
          <div className="mt-z4">
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              value={result.find((obj) => obj.value === user.carreraId)}
              onChange={handleChange}
              name="carreraId"
              options={result}
              placeholder="Selecciona una carrera"
              theme={(theme) => ({
                ...theme,
                padding: '15px',
              })}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {/* {errors.carne */}
              {/*    ? <span className="material-icons me-1">error_outline</span> */}
              {/*    : null */}
              {/* } */}
              {/* {errors.carne?.message} */}
            </div>
          </small>
          {/* Password */}
          <div className="input-container">
            <span className={`material-icons input-icon ${filled.password ? 'is-filled' : ' '}`}>
              lock
            </span>
            <input
              className="input ms-1"
              type="password"
              name="password"
              placeholder="Contraseña"
              onInput={handleInputChange}
              value={user.password}
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
          {/* LOGIN BUTTON */}
          <div className="d-flex flex-column justify-content-center align-items-center mt-4 px-2">
            <button onSubmit={onSubmit} className="btn-fill arrow-button w-50" type="submit">
              REGISTRARSE
              <span
                className="material-icons position-absolute ms-1"
              >
                arrow_forward
              </span>
            </button>
            <span className="mt-2">
              ¿Ya tienes cuenta?
              <Link to="/" className="ms-1 text-gold">
                Inicia Sesión
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

RegisterForm.propTypes = {
  handleClick: PropTypes.func,
};

RegisterForm.defaultProps = {
  handleClick() {
    console.log('Function not working');
  },
};

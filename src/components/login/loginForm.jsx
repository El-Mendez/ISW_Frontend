import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import history from '../history';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  username: z.string().nonempty({ message: 'Ingresa un usuario' }),
  password: z.string().nonempty({ message: 'Ingresa una contraseña' }).min(8, { message: 'Mínimo 8 caracteres' }),
});

function LoginForm() {

  const get_user = 'http://3.15.200.46:8000/api/login/'

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [loginData, setLogindata] = useState({
    username: '',
    password: '',
  });

  const [loginFilled, setLoginfilled] = useState({
    username: false,
    password: false,
  });

  function getUser(){
    console.log("Loading...");
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_user,
          {
            username: loginData.username,
            password: loginData.password
          }
        );
        console.log(data);
        history.push(`/home`);
        history.go();
      } catch (error) {
        console.log(error);
        alert('Usuario o contraseña incorrectos');
      }
    };
    fetchData();
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    console.log('wtf');
    setLogindata({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value !== '') {
      setLoginfilled({
        ...loginFilled,
        [e.target.name]: true,
      });
    } else {
      setLoginfilled({
        ...loginFilled,
        [e.target.name]: false,
      });
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    getUser();
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="position-relative mt-2">
          <input
            className={`input ${loginFilled.username ? 'is-filled' : ' '}`}
            type="text"
            name="username"
            onInput={handleInputChange}
            {...register('username')}
          />
          <label className="label">Usuario</label>
          <small className="text-danger text-small d-block mb-2">
            {/* <Exclamation_icon/> */}
            {errors.username?.message}
          </small>
        </div>
        {/* Password */}
        <div className="position-relative mt-2">
          <input
            className={`input ${loginFilled.username ? 'is-filled' : ' '}`}
            type="password"
            name="password"
            onInput={handleInputChange}
            {...register('password')}
          />
          <label className="label">Contraseña</label>
          <small className="text-danger text-small d-block mb-2">
            {/* <Exclamation_icon/> */}
            {errors.password?.message}
          </small>
        </div>
        {/* REGISTER BUTTON */}
        <button onSubmit={onSubmit} className="btn btn-meeting btn-fill my-3 w-100">INICIAR SESIÓN</button>
      </form>
    </>
  );
}

export default LoginForm;

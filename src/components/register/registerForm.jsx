import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import history from '../utils/history';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().nonempty({ message: 'Ingresa un usuario' }).email({message: 'Ingresa un correo válido'}),
  username: z.string().nonempty({ message: 'Ingresa un usuario' }),
  password: z.string().nonempty({message: 'Ingresa una contraseña'}).min(8,{message: 'Mínimo 8 caracteres'}),
});

function RegisterForm() {

  const post_user = 'http://3.15.200.46:8000/api/register/';

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [registerData, setRegisterdata] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [registerFilled, setRegisterfilled] = useState({
    email: false,
    username: false,
    password: false,
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    console.log('wtf');
    setRegisterdata({
      ...registerData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value !== '') {
      setRegisterfilled({
        ...registerFilled,
        [e.target.name]: true,
      });
    } else {
      setRegisterfilled({
        ...registerFilled,
        [e.target.name]: false,
      });
    }
  };

  const createUser = () =>{
    const fetchData = async () =>{
      try{
        const { data } = await Axios.post(post_user,
          {
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
          }
        );
        history.push(`/home`);
        history.go();
      } catch (error){
        console.log(error)
        alert("Usuario o correo ya existente. Prueba con un correo o un usuario distinto")
      }
    }
    fetchData();
  };


  const onSubmit = (data) => {
    console.log(data);
    createUser();
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.email ? 'is-filled' : ' '}`}
            type="text"
            name="email"
            onInput={handleInputChange}
            {...register('email')}
          />
          <label className="label">Correo electrónico</label>
          <small className="text-danger text-small d-block mb-2">
            {/* <Exclamation_icon/> */}
            {errors.email?.message}
          </small>
        </div>
        {/* Username */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.username ? 'is-filled' : ' '}`}
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
            className={`input ${registerFilled.password ? 'is-filled' : ' '}`}
            type="text"
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
        {/*REGISTER BUTTON*/}
        <button onSubmit={onSubmit} className={`btn btn-meeting btn-fill my-3 w-100`}>REGISTRARTE</button>
      </form>
    </>
  );
}

export default RegisterForm;

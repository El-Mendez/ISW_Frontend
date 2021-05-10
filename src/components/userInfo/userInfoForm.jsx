import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  username: z.string().nonempty({ message: 'Ingresa un usuario' }).email({message: 'Ingresa un correo válido'}),
  carrera: z.string().nonempty({ message: 'Ingresa un usuario' }),
  colegio: z.string().nonempty({message: 'Ingresa una contraseña'}).min(8,{message: 'Mínimo 8 caracteres'}),
  cursos: z.string().nonempty({ message: 'Ingresa un usuario' }),
  facebook: z.string().nonempty({ message: 'Ingresa un usuario' }),
  instagram: z.string().nonempty({ message: 'Ingresa un usuario' }),
  whatsApp: z.string().nonempty({ message: 'Ingresa un usuario' }),

});

function UserInfoForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [registerData, setRegisterdata] = useState({
    username: '',
    carrera: '',
    colegio: '',
    cursos: '',
    facebook: '',
    instagram: '',
    whatsApp: '',
  });

  const [registerFilled, setRegisterfilled] = useState({
    username: false,
    carrera: false,
    colegio: false,
    cursos: false,
    facebook: false,
    instagram: false,
    whatsApp: false,
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

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.username ? 'is-filled' : ' '}`}
            type="text"
            name="username"
            onInput={handleInputChange}
            {...register('username')}
          />
          <label className="label">¿Cómo quieres que te llamemos?</label>
          <small className="text-danger text-small d-block mb-2">
            {errors.username?.message}
          </small>
        </div>
        {/* Falta agregar el dropdown menu para que escoja la carrera */}

        {/* Colegio */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.colegio ? 'is-filled' : ' '}`}
            type="text"
            name="colegio"
            onInput={handleInputChange}
            {...register('colegio')}
          />
          <label className="label">Último colegio en el que estudiaste</label>
          <small className="text-danger text-small d-block mb-2">
            {/* <Exclamation_icon/> */}
            {errors.colegio?.message}
          </small>
        </div>
        {/* Cursos  */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.cursos ? 'is-filled' : ' '}`}
            type="text"
            name="cursos"
            onInput={handleInputChange}
            {...register('cursos')}
          />
          <label className="label">Cursos actuales</label>
          <small className="text-danger text-small d-block mb-2">
            {/* <Exclamation_icon/> */}
            {errors.cursos?.message}
          </small>
        </div>
        {/* SECCIÓN DE LOS HOBBIES */}
        {/* FACEBOOK */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.facebook ? 'is-filled' : ' '}`}
            type="text"
            name="facebook"
            onInput={handleInputChange}
            {...register('facebook')}
          />
          <label className="label">Comparte el link a tu perfil de facebook</label>
          <small className="text-danger text-small d-block mb-2">
            {errors.facebook?.message}
          </small>
        </div>
        {/* INSTAGRAM */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.instagram ? 'is-filled' : ' '}`}
            type="text"
            name="instagram"
            onInput={handleInputChange}
            {...register('instagram')}
          />
          <label className="label">¿Cómo quieres que te llamemos?</label>
          <small className="text-danger text-small d-block mb-2">
            {errors.instagram?.message}
          </small>
        </div>
        {/* WHATSAPP */}
        <div className="position-relative mt-2">
          <input
            className={`input ${registerFilled.whatsApp ? 'is-filled' : ' '}`}
            type="text"
            name="whatsApp"
            onInput={handleInputChange}
            {...register('whatsApp')}
          />
          <label className="label">¿Cómo quieres que te llamemos?</label>
          <small className="text-danger text-small d-block mb-2">
            {errors.whatsApp?.message}
          </small>
        </div>
        {/*REGISTER BUTTON*/}
        <button onSubmit={onSubmit} className={`btn btn-meeting btn-fill my-3 w-100`}>REGISTRARTE</button>
      </form>
    </>
  );
}

export default UserInfoForm;

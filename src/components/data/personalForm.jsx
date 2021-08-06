import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import history from '../history';
import { useRouteMatch } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AsyncSelect from "react-select/async/dist/react-select.esm";

const schema = z.object({
  name: z.string().nonempty({ message: 'Ingresa su nombre completo' }),
  sex: z.string().nonempty({ message: 'Seleccione su sexo' }),
  school: z.string().nonempty({message: 'Ingresa una contraseña'}).min(8,{message: 'Mínimo 8 caracteres'}),
  carrera: z.string(),
  cursos: z.string(),
  facebook: z.string(),
  instagram: z.string()
});

function PersonalForm() {
  let { url } = useRouteMatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'On Change',
    resolver: zodResolver(schema),
  });
  const [data, setData] = useState({
    name: '',
    sex: '',
    school: '',
    carrera: '',
    cursos: '',
    facebook: '',
    instagram: '',
  });

  const [filled, setFilled] = useState({
    name: false,
    school: false,
    carrera: false,
    facebook: false,
    instagram: false,
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
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

  const onSubmit = (data) => {
    console.log(data);
    history.push(`${url}/home`);
    history.go();
  }

  return (
    <div className="container px-0 bg-secondary pt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* DATA */}
        <div className="container px-5 my-5">
            <div className="d-flex align-items-center px-0">
              <div className="progress-activate-circle d-flex justify-content-center activate me-3">
                <h2 className="progress-number">1</h2>
              </div>
              <h1>Información Académica</h1>
            </div>
          {/* Cursos */}
          <div className="mb-z4">
            <AsyncSelect
                placeholder="Ingrese los cursos"
            />
          </div>
          {/* Hobbies */}
          <div className="mb-z4">
            <AsyncSelect
                placeholder="Añada sus hobbies"
            />
          </div>
        </div>
        <div className="container px-5">
            <div className="d-flex align-items-center px-0">
              <div className="progress-activate-circle d-flex justify-content-center activate me-3">
                <h2 className="progress-number">3</h2>
              </div>
              <h1>Información de Contacto</h1>
            </div>
          {/* Facebook */}
          <div className="input-container mt-3">
             <span className={`material-icons input-icon ${filled.facebook ? 'is-filled' : ' '}`}>
                lock
            </span>
            <input
                className="input ms-1"
                type="facebook"
                name="facebook"
                placeholder="Perfil de Facebook"
                onInput={handleInputChange}
                {...register('facebook')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.facebook
                  ? <span className="material-icons me-1">error_outline</span>
                  : null
              }
              {errors.facebook?.message}
            </div>
          </small>
          {/* Instagram */}
          <div className="input-container mt-3">
             <span className={`material-icons input-icon ${filled.instagram ? 'is-filled' : ' '}`}>
                lock
            </span>
            <input
                className="input ms-1"
                type="instagram"
                name="instagram"
                placeholder="Perfil de Instagram"
                onInput={handleInputChange}
                {...register('instagram')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.instagram
                  ? <span className="material-icons me-1">error_outline</span>
                  : null
              }
              {errors.instagram?.message}
            </div>
          </small>
          {/* Phone number */}
          <div className="input-container mt-3">
             <span className={`material-icons input-icon ${filled.phone ? 'is-filled' : ' '}`}>
                whatsapp
            </span>
            <input
                className="input ms-1"
                type="phone"
                name="phone"
                placeholder="Número de teléfono"
                onInput={handleInputChange}
                {...register('phone')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.phone
                  ? <span className="material-icons me-1">error_outline</span>
                  : null
              }
              {errors.phone?.message}
            </div>
          </small>
        </div>
        {/* NEXT BUTTON */}
        <div className="d-flex bg-gold w-100 mt-5 justify-content-end">
          <button onSubmit={onSubmit} className={`btn btn-data my-1 me-3`}>SIGUIENTE
            <span
            className="material-icons position-absolute ms-1">arrow_forward</span></button>
        </div>
      </form>
    </div>

  );
}

export default PersonalForm;

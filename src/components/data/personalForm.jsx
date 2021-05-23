import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import history from '../history';
import { useRouteMatch } from 'react-router-dom';

const schema = z.object({
  name: z.string().nonempty({ message: 'Ingresa su nombre completo' }),
  sex: z.string().nonempty({ message: 'Seleccione su sexo' }),
  school: z.string().nonempty({message: 'Ingresa una contraseña'}).min(8,{message: 'Mínimo 8 caracteres'}),
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
  });

  const [filled, setFilled] = useState({
    name: false,
    school: false,
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
    history.push(`${url}/contact`);
    history.go();
  }

  return (
    <div className="container px-0 bg-secondary pt-2">
      {/* Progress */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="progress-activate-circle d-flex justify-content-center activate">
          <h2 className="progress-number">1</h2>
        </div>
        <div className="progress-line"/>
        <div className="progress-deactivate-circle d-flex justify-content-center">
          <h2 className="progress-number">2</h2>
        </div>
        <div className="progress-line"/>
        <div className="progress-deactivate-circle d-flex justify-content-center">
          <h2 className="progress-number">3</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* DATA */}
        <div className="container px-5">
          <h1>Información Personal</h1>
          {/* Name */}
          <div className="position-relative mt-3">
            <input
              className={`border border-1 input ${filled.name ? 'is-filled' : ' '}`}
              type="text"
              name="name"
              onInput={handleInputChange}
              {...register('name')}
            />
            <label className="label">Nombre completo</label>
            <small className="text-danger text-small d-block mb-2">
              {/* <Exclamation_icon/> */}
              {errors.name?.message}
            </small>
          </div>
          {/* Sex */}
          <div className="position-relative mt-3 border border-1">
            <p className="ms-1 mb-0">Sexo</p>
            <input type="radio"
                   id="femenino"
                   value="femenino"
                   className="ms-3"
                   {...register("sex", { required: true })} />
            <label htmlFor="femenino" className="ms-1">Femenino</label>
            <input type="radio"
                   id="masculino"
                   className="ms-5"
                   value="masculino"
                   {...register("sex", { required: true })} />
            <label htmlFor="masculino" className="ms-1">Masculino</label><br/>
            <small className="text-danger text-small d-block mb-2">
              {/* <Exclamation_icon/> */}
              {errors.sex?.message}
            </small>
          </div>
          {/* School */}
          <div className="position-relative mt-3">
            <input
              className={`input border border-1 ${filled.school ? 'is-filled' : ' '}`}
              type="school"
              name="school"
              onInput={handleInputChange}
              {...register('school')}
            />
            <label className="label">Colegio anterior</label>
            <small className="text-danger text-small d-block mb-2">
              {/* <Exclamation_icon/> */}
              {errors.school?.message}
            </small>
          </div>
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

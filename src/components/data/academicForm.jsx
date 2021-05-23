import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import history from '../history';

const schema = z.object({
  carrera: z.string(),
  cursos: z.string(),
});

function AcademicForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'On Change',
    resolver: zodResolver(schema),
  });
  const [data, setData] = useState({
    carrera: '',
    cursos: '',
  });

  const [filled, setFilled] = useState({
    carrera: false,
    cursos: false,
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
    history.push(`/home`);
    history.go();
  }

  const handleBack = () => {
    console.log('wtf')
    history.push(`${url}/contact`);
    history.go();
  }

  return (
    <div className="container px-0 bg-secondary pt-2">
      {/* Progress */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="progress-deactivate-circle d-flex justify-content-center activate">
          <h2 className="progress-number">1</h2>
        </div>
        <div className="progress-line"/>
        <div className="progress-deactivate-circle d-flex justify-content-center">
          <h2 className="progress-number">2</h2>
        </div>
        <div className="progress-line"/>
        <div className="progress-activate-circle d-flex justify-content-center">
          <h2 className="progress-number">3</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* DATA */}
        <div className="container px-5">
          <h1>Información Académica</h1>
          {/* Carrera */}
          <div className="position-relative mt-3">
            <input
              className={`border border-1 input ${filled.carrera ? 'is-filled' : ' '}`}
              type="text"
              name="carrera"
              onInput={handleInputChange}
              {...register('carrera')}
            />
            <label className="label">Carrera</label>
            <small className="text-danger text-small d-block mb-2">
              {/* <Exclamation_icon/> */}
              {errors.carrera?.message}
            </small>
          </div>
          {/* Courses */}
          <div className="position-relative mt-3">
            <input
              className={`input border border-1 ${filled.cursos ? 'is-filled' : ' '}`}
              type="text"
              name="cursos"
              onInput={handleInputChange}
              {...register('cursos')}
            />
            <label className="label">Cursos</label>
            <small className="text-danger text-small d-block mb-2">
              {/* <Exclamation_icon/> */}
              {errors.cursos?.message}
            </small>
          </div>
        </div>
        {/* NEXT BUTTON */}
        <div className="d-flex bg-gold w-100 mt-5 justify-content-between">
          <button onSubmit={handleBack} className={`btn btn-data my-1 ms-3`}>
            <span className="material-icons position-absolute before-icon">arrow_back</span>
            ANTERIOR
          </button>
          <button onSubmit={onSubmit} className={`btn btn-data my-1 me-3`}> SIGUIENTE
            <span className="material-icons position-absolute ms-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>

  );
}

export default AcademicForm;

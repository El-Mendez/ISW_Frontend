import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  title: z.string().nonempty({ message: 'Ingresa un titulo' }),
  mensaje: z.string().nonempty({ message: 'Ingresa un mensaje' }),
});

export default function ModalLogin(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [user, setUser] = useState({
    title: '',
    message: '',
  });

  const [filled, setFilled] = useState({
    title: false,
    message: false,
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    console.log('wtf');
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

  const onSubmit = (data) => {
    console.log(data);
    alert("Mensaje enviado")
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="sm"
      centered
    >
      <Modal.Header className="bg-purple-dark">
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="modalHeader my-2">
            ENVIAR MENSAJE
          </p>
        </Modal.Title>
        <button type="button" className="btn-close m-0" aria-label="Close" onClick={props.onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Titulo */}
            <div className="position-relative mt-2">
              <input
                className={`input ${filled.title ? 'is-filled' : ' '}`}
                type="text"
                name="username"
                onInput={handleInputChange}
                {...register('title')}
              />
              <label className="label">Titulo del mensaje</label>
              <small className="text-danger text-small d-block mb-2">
                {/* <Exclamation_icon/> */}
                {errors.title?.message}
              </small>
            </div>
            {/* Password */}
            <div className="position-relative mt-2">
              <input
                className={`input ${filled.message ? 'is-filled' : ' '}`}
                type="text"
                name="message"
                onInput={handleInputChange}
                {...register('mensaje')}
              />
              <label className="label">Mensaje</label>
              <small className="text-danger text-small d-block mb-2">
                {/* <Exclamation_icon/> */}
                {errors.mensaje?.message}
              </small>
            </div>
            {/* LOGIN BUTTON */}
            <button onSubmit={onSubmit} className="btn btn-meeting btn-fill my-3 w-100">INICIA SESIÓN</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Cookies from 'universal-cookie';
import logo from '../../assets/logo.svg';
import { REPORT } from './rutas';

const schema = z.object({
  text: z.string().nonempty({ message: 'Ingrese un mensaje' }).min(8, { message: 'Mínimo 10 caracteres' }),
});

export default function Help(props) {
  const item = props;
  const cookies = new Cookies();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [filled, setFilled] = useState({
    message: false,
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    console.log('prueba');
  };
  const handleInputChange = (e) => {
    setMensaje(e.target.value);
    console.log(mensaje);
    if (e.target.value !== '') {
      setFilled({
        message: true,
      });
    } else {
      setFilled({
        message: false,
      });
    }
  };
  const onSubmit = () => {
    console.log(mensaje);
    alert('El mensaje se ha enviado');
  };
  // FIXME Validar funcionamiento
  const cleanUp = () => {
    setMensaje('');
    setFilled(false);
    item.onHide();
  };

  return (
    <Modal
      {...item}
      aria-labelledby="contained-modal-title-vcenter"
      size="sm"
      centered
    >
      <Modal.Header className="bg-purple-dark">
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="d-flex flex-column align-items-center">
            <p className="welcome">
              ¿En qué podemos ayudarte?
            </p>
            <img src={logo} alt="Logo" className="img-size w-50" />
            <p className="mt-1 description text-center px-4">
              Escribe un mensaje explicando tu problema y nosotros te daremos soporte
            </p>
          </div>
        </Modal.Title>
        <button type="button" className="btn-close m-0" aria-label="Close" onClick={cleanUp} />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-container">
            <small className="text-danger text-small d-block mb-2">
              {/* <Exclamation_icon/> */}
              {errors.text?.message}
            </small>
            <div className="input-container">
              <span className={`material-icons input-icon ${filled.carne ? 'is-filled' : ' '}`}>
                email
              </span>
              <input
                className={`input ms-1 ${filled.carne ? 'is-filled' : ' '}`}
                type="text"
                name="message"
                placeholder="Escríbenos un mensaje..."
                onInput={handleInputChange}
                {...register('text')}
              />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4 px-2">
              <button className="btn-fill arrow-button w-50" type="submit">
                Enviar
                <span className="material-icons position-absolute ms-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

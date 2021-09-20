import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import logo from '../../assets/logo.svg';

export default function Report(props) {
  const item = props;

  const options = [
    { value: 'spam', label: 'Es sospechoso o spam' },
    { value: 'hack', label: 'Parece que su cuenta fue hackeada' },
    { value: 'roboDeIdentidad', label: 'Finge ser yo' },
    { value: 'obsceno', label: 'La información de su perfil es abusivo o incita al odio' },
  ];
  const [report, setReport] = useState('');
  const [comment, setComment] = useState('');
  const [filled, setFilled] = useState({
    type: false,
  });

  const handleChange = (e) => {
    setReport(e.value);
    if (e.value !== '') {
      setFilled({
        type: true,
      });
    } else {
      setFilled({
        type: false,
      });
    }
  };
  const handleInputChange = (e) => {
    setComment(e.target.value);
  };
  const onSubmit = () => {
    console.log(report);
    console.log(comment);
    console.log(filled);
  };
  // FIXME Validar funcionamiento
  const cleanUp = () => {
    setReport('');
    setComment('');
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
              Ayúdanos a entender el problema con esta cuenta
            </p>
            <img src={logo} alt="Logo" className="img-size w-50" />
            <p className="mt-1 description text-center px-4">
              ¿Cúal es el motivo de reportar esta cuenta? El reporte que realices será anónimo.
            </p>
          </div>
        </Modal.Title>
        <button type="button" className="btn-close m-0" aria-label="Close" onClick={cleanUp} />
      </Modal.Header>
      <Modal.Body>
        <div className="auth-container">
          <div className={`${filled ? 'is-filled' : ' '}`}>
            <Select
              options={options}
              name="type"
              placeholder="Motivo..."
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <span className={`material-icons input-icon ${filled ? 'is-filled' : ' '}`}>
              message
            </span>
            <input
              className="input ms-1"
              type="email"
              name="comment"
              placeholder="Añadir comentario (opcional)"
              onInput={handleInputChange}
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mt-4 px-2">
            <button onClick={onSubmit} className="btn-fill arrow-button w-50" type="submit">
              Enviar
              <span className="material-icons position-absolute ms-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { CANCEL_REQUEST, SEARCH_IMG, ACCEPT_REQUEST } from './rutas';

export default function CardRequest(props) {
  const [image, setImage] = useState(false);
  const [font, setFont] = useState({
    name: '0',
    email: '0',
    career: '0',
  });
  const cookies = new Cookies();
  const token = cookies.get('session');

  function handleClickCancel() {
    const request = async () => {
      try {
        await Axios.post(CANCEL_REQUEST,
          {
            carne: props.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        props.setReload(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function handleClickAccept() {
    const request = async () => {
      try {
        await Axios.post(ACCEPT_REQUEST,
          {
            carne: props.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        alert(`Se ha aceptado la solicitud de${props.name}`);
        props.setReload(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }

  const dinamicFont = () => {
    const card = document.getElementsByClassName('card-body');
    const name = card[0].offsetWidth * 0.07;
    const email = card[0].offsetWidth * 0.045;
    const career = card[0].offsetWidth * 0.05;
    setFont({
      name: `${name}px`,
      email: `${email}px`,
      career: `${career}px`,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    const img = new Image();

    img.onload = () => {
      // image exists and is loaded
      setImage(true);
    };
    img.onerror = () => {
      // image exists and is loaded
      setImage(false);
    };

    img.src = `${SEARCH_IMG}/${props.carne}.png`;
    dinamicFont();
    window.onresize = () => { dinamicFont(); };
  }, []);

  return (
    <>
      <div className="card-item request">
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
          <div className="image-container">
            <img src={`${SEARCH_IMG}/${image ? `${props.carne}.png` : 'default.svg'}`} className="image-top rounded-circle" alt="Profile" />
          </div>
          <div className="card-body p-1 my-1 pb-1 w-100 d-flex flex-column justify-content-center align-items-center border-bottom">
            <div className="card-title" style={{ fontSize: font.name }}>{props.name}</div>
            <p className="card-email mt-1 mb-2" style={{ fontSize: font.email }}>{props.email}</p>
            <p className="card-career mb-0" style={{ fontSize: font.career }}>{props.career}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <Link className="btn-profile request mx-2 mb-2" type="button" to={props.viewProfile}>
            PERFIL
          </Link>
          {!props.type ? (
            <button className="btn-cancel mx-2 mb-2" type="button" onClick={handleClickAccept}>
              Aceptar
            </button>
          ) : (
            <button className="btn-cancel mx-2 mb-2" type="button" onClick={handleClickCancel}>
              CANCELAR
            </button>
          )}
        </div>
      </div>
    </>
  );
}

CardRequest.propTypes = {
  carne: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  career: PropTypes.string,
  viewProfile: PropTypes.string,
  setReload: PropTypes.func,
  type: PropTypes.number,
};

CardRequest.defaultProps = {
  carne: 191025,
  name: 'Jose Javier Hurtarte Hernandez',
  email: 'juanito@meetinguvg.me',
  career: 'Ingeniería en Ciencias de la Computación y Tecnología de la Información',
  viewProfile: 'home/search/courses/profile/0',
  type: 0,
  setReload() { console.log('No props'); },
};

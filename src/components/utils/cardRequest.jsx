import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { CANCEL_REQUEST, SEARCH_IMG} from './rutas';

export default function CardRequest(props) {
  const [image, setImage] = useState(false);
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
  }, []);

  return (
    <>
      <div className="card-item request">
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
          <div className="image-container">
            <img src={`${SEARCH_IMG}/${image ? `${props.carne}.png` : 'default.svg'}`} className="image-top rounded-circle" alt="Profile" />
          </div>
          <div className="card-body p-1 mt-1 w-100 d-flex flex-column justify-content-center align-items-center border-bottom">
            <p className="card-title">{props.name}</p>
            <p className="card-email mt-1 mb-0">{props.email}</p>
            <p className="card-career mb-0">{props.career}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <Link className="btn-profile request mx-2 mb-2" type="button" to={props.viewProfile}>
            PERFIL
          </Link>
          <button className="btn-cancel mx-2 mb-2" type="button" onClick={handleClickCancel}>
            CANCELAR
          </button>
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
};

CardRequest.defaultProps = {
  carne: 191025,
  name: 'Juanito Prueba',
  email: 'juanito@meetinguvg.me',
  career: 'Ingeniería en mentiras',
  viewProfile: 'home/search/courses/profile/0',
  setReload() { console.log('No props'); },
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SEARCH_IMG } from './rutas';

export default function Card(props) {
  const [image, setImage] = useState(false);
  const [font, setFont] = useState({
    name: '0',
    email: '0',
    career: '0',
  });

  const dinamicFont = () => {
    const card = document.getElementsByClassName('card-body');
    const name = card[0].offsetWidth * 0.065;
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
    window.addEventListener('resize', dinamicFont);
  }, []);

  return (
    <>
      <div className="card-item" id="suggestionResult">
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
          <div className="image-container">
            <img src={`${SEARCH_IMG}/${image ? `${props.carne}.png` : 'default.svg'}`} className="image-top rounded-circle" alt="Profile" />
          </div>
          <div
            className="card-body p-1 mt-1 w-100 d-flex flex-column justify-content-center align-items-center"
          >
            <Link className="noDecorations" to={props.viewProfile}>
              <div className="card-title" style={{ fontSize: font.name }} value={props.name}>{props.name}</div>
            </Link>
            <p className="card-email mt-1 mb-2" style={{ fontSize: font.email }}>{props.email}</p>
            <p className="card-career mb-0" style={{ fontSize: font.career }}>{props.career}</p>
          </div>
        </div>
        <Link className="btn-profile" type="button" to={props.viewProfile}> VER PERFIL </Link>
      </div>
    </>
  );
}

Card.propTypes = {
  carne: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  career: PropTypes.string,
  viewProfile: PropTypes.string,
};

Card.defaultProps = {
  carne: 191025,
  name: 'Juanito Prueba',
  email: 'juanito@meetinguvg.me',
  career: 'Ingeniería en Ciencias de la Computación y Tecnología de la información',
  viewProfile: 'home/search/courses/profile/0',
};

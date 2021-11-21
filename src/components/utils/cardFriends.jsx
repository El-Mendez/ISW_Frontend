import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardFriends(props) {
  const [image, setImage] = useState(false);
  const [font, setFont] = useState({
    name: '0',
    email: '0',
    career: '0',
  });

  const dinamicFont = () => {
    const card = document.getElementsByClassName('card-body');
    const name = card[0].offsetWidth * 0.1;
    const email = card[0].offsetWidth * 0.055;
    const career = card[0].offsetWidth * 0.06;
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

    img.src = `../../../public/assets/${props.carne}.png`;

    dinamicFont();
    window.onresize = () => { dinamicFont(); };
  }, []);

  return (
    <>
      <div className="card-item">
        <div className="p-2 d-flex ">
          <div className="image-container">
            <img src={`../../../public/assets/${image ? `${props.carne}.png` : 'default.svg'}`} className="image-top rounded-circle" alt="Profile" />
          </div>
          <div className="card-body p-1 mt-1 w-100 d-flex flex-column justify-content-center align-items-center">
            <p className="card-title" style={{ fontSize: font.name }}>{props.name}</p>
            <p className="card-email mt-1 mb-2" style={{ fontSize: font.email }}>{props.email}</p>
            <p className="card-career mb-0" style={{ fontSize: font.career }}>{props.career}</p>
          </div>
        </div>
        <Link className="btn-profile " type="button" to={props.viewProfile}> VER PERFIL </Link>
      </div>
    </>
  );
}

CardFriends.propTypes = {
  carne: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  career: PropTypes.string,
  viewProfile: PropTypes.string,
};

CardFriends.defaultProps = {
  carne: 191025,
  name: 'Jose Javier Hurtarte Hernandez',
  email: 'juanito@meetinguvg.me',
  career: 'Ingeniería en Ciencias de la computación y Tecnologia de la informacion',
  viewProfile: 'home/search/courses/profile/0',
};

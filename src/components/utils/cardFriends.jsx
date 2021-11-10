import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardFriends(props) {
  const [image, setImage] = useState(false);

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
  }, []);

  // TODO hacer el texto responsive → que se ajuste al ancho del elemento
  return (
  // eslint-disable-next-line react/style-prop-object
    <>
      <div className="card-item">
        <div className="p-2 d-flex ">
          <div className="image-container">
            <img src={`../../../public/assets/${image ? `${props.carne}.png` : 'default.svg'}`} className="image-top rounded-circle" alt="Profile" />
          </div>
          <div className="card-body p-1 mt-1 w-100 d-flex flex-column justify-content-center align-items-center">
            <p className="card-hor-title">{props.name}</p>
            <p className="card-email mt-1 mb-0">{props.email}</p>
            <p className="card-career horizontal mb-0">{props.career}</p>
          </div>
        </div>
        <Link className="btn-profile" type="button" to={props.viewProfile}> VER PERFIL </Link>
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
  name: 'Juanito Prueba',
  email: 'juanito@meetinguvg.me',
  career: 'Ingeniería en mentiras',
  viewProfile: 'home/search/courses/profile/0',
};

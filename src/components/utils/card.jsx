import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import img from '../../assets/3.svg';

export default function Card(props) {
  // TODO hacer el texto responsive → que se ajuste al ancho del elemento
  return (
    <>
      <div className="card-item">
        <div className="p-2">
          <div className="image-container">
            <img src={img} className="image-top rounded-circle" alt="Profile" />
          </div>
          <div className="card-body p-1 mt-1 w-100 d-flex flex-column justify-content-center align-items-center">
            <p className="card-title">{props.name}</p>
            <p className="card-email mt-1 mb-0">{props.email}</p>
            <p className="card-career mb-0">{props.career}</p>
          </div>
        </div>
        <Link className="btn-profile" type="button" to={props.viewProfile}> VER PERFIL </Link>
      </div>
    </>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  career: PropTypes.string,
  viewProfile: PropTypes.string,
};

Card.defaultProps = {
  name: 'Juanito Prueba',
  email: 'juanito@meetinguvg.me',
  career: 'Ingeniería en mentiras',
  viewProfile: 'home/search/courses/profile/0',
};

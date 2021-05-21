import React from 'react';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';
import user from '../../assets/user.png';

function Perfil(props) {
  const item = props;
  return (
    <div>
      <div className="container perfil">
        <div className="row">
          <div className="col-4 userImage">
            <img alt="usuario" src={user} />
          </div>
          <div className="col userInformation">
            <h1>
              {`${item.nombres} ${item.apellidos}`}
              {' '}
            </h1>
            <h2>Pablo_AGE</h2>
          </div>
        </div>
        <div className="row info">
          <div className="row">
            <h1>
              Información personal
            </h1>
          </div>
          <div className="row">
            <h2>
              Nombres:
              {` ${item.nombres}`}
            </h2>
          </div>
          <div className="row">
            <h2>
              Apellidos:
              {` ${item.apellidos}`}
            </h2>
          </div>
          <div className="row">
            <h2>
              Nombre de usuario:
              {` ${item.userName}`}
            </h2>
          </div>
          <div className="row">
            <h2>
              Carrera:
              {` ${item.carrera}`}
            </h2>
          </div>
          <div className="row">
            <h2>
              Hobbies:
              {' '}
              {` ${item.hobbies}`}
            </h2>
          </div>
          <div className="row">
            <h2>
              Descripción:
              {' '}
              {` ${item.descripcion}`}
            </h2>
          </div>
          <div className="row">
            <h2>
              Redes sociales
              { item.facebook !== null ? (
                <div>
                  <AiFillFacebook />
                  {` ${item.facebook}`}
                </div>
              ) : ''}
              { item.twitter !== null ? (
                <div>
                  <AiFillTwitterSquare />
                  {` ${item.twitter}`}
                </div>
              ) : ''}
              { item.instagram !== null ? (
                <div>
                  <AiFillInstagram />
                  {` ${item.instagram}`}
                </div>
              ) : ''}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;

import React from 'react';
import user from '../../assets/user.png';

function SuggestionItem(props) {
  const item = props;
  return (
    <div className="container datosUsuario">
      <div className="row">
        <div className="image col-4">
          <div className="userPicture mt-1">
            <img src={user} alt="User profile" width="150px" height="150px" className="rounded-circle" />
          </div>
        </div>
        <div className="col datos">
          <div className="row">
            <h1>{item.nombre}</h1>
          </div>
          <div className="row">
            <h2>{item.username}</h2>
          </div>
          <div className="row">
            <h2>
              Carrera:
              {item.carrera}
            </h2>
          </div>
          <div className="row">
            <h2>
              Hobbies:
              {item.hobbies}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;

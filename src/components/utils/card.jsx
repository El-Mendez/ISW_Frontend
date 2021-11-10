import React from 'react';
import img from '../../assets/3.svg';

export default function Card() {
  // TODO hacer el texto responsive
  return (
    <>
      <div id="songs" className="songs-container">
        <div className="item-card card">
          <div className="p-2">
            <div className="image-container">
              <img src={img} className="image-top rounded-circle" alt="Profile" />
            </div>
            <div className="card-body p-1 mt-1 w-100 d-flex flex-column justify-content-center align-items-center">
              <p className="card-song-title">Juanito de Prueba</p>
              <p className="card-text mt-1 mb-0">juanito@meetinguvg.me</p>
              <p className="email mb-0">Ingeniería en Mentiras</p>
            </div>
          </div>
          <button className="btn-profile">
            VER PERFIL
          </button>
        </div>
      </div>
    </>
  );
}

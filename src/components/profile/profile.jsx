import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import img from '../../assets/friends.svg';
import ProfileItem from './profileItem';
import Report from './report';
import { USER_INFO } from '../utils/rutas';

export default function Profile() {
  const [report, setReport] = useState(false);
  const contact = ['test', 'testing', 'ya no recuerdo', 'ahahahah'];
  const id = useParams();
  const [isSelected, setIsSelected] = useState({
    contact: true,
    courses: false,
    hobbies: false,
  });
  const [user, setUser] = useState({
    carne: '',
    nombre_completo: '',
    carrera: '',
    correo: '',
    cursos: [],
    hobbies: [],
    redes_sociales: [],
  });
  const handleClick = (e) => {
    setIsSelected({
      [e.target.id]: true,
    });
  };
  function userInfo() {
    const request = async () => {
      try {
        const res = await Axios.get(`${USER_INFO}${id.carne}`);
        setUser({
          carne: res.data[0].carne,
          nombre_completo: res.data[0].nombre_completo,
          carrera: res.data[0].carrera,
          correo: res.data[0].correo,
          cursos: res.data[0].cursos,
          hobbies: res.data[0].hobbies,
        });
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  useEffect(() => {
    userInfo();
  }, []);
  return (
    <div className="container profile">
      <div className="row">
        <div className="col-sm-12 col-md-4 d-flex justify-content-center" id="profile-img">
          <img src="https://avatars.dicebear.com/api/bottts/:seed.svg" alt="Profile" className="w-75 rounded-circle" width="inherit" />
        </div>
        <div className="col-sm-12 col-md-7 d-flex flex-column align-self-end">
          <h1>{` ${user.nombre_completo}`}</h1>
          <h5>{` ${user.carrera}`}</h5>
          <h4 className="mt-4">
            Carné:
            {` ${user.carne}`}
          </h4>
          <div className="d-flex border-1 border-bottom mt-4">
            <button onClick={handleClick} id="contact" type="button" className={`button-styless mb-2 d-flex align-content-center select-item ${isSelected.contact ? 'isSelected' : ''}`}>
              <span className="material-icons"> person </span>
              Contacto
            </button>
            <button onClick={handleClick} id="courses" type="button" className={`button-styless ms-3 mb-2 d-flex align-content-center select-item ${isSelected.courses ? 'isSelected' : ''}`}>
              <span className="material-icons"> library_books </span>
              Cursos
            </button>
            <button onClick={() => setReport(true)} id="report" type="button" className="button-report ms-3 mb-2 d-flex align-content-center">
              <span className="material-icons"> report </span>
              <p>
                Reportar
              </p>
            </button>
            <button onClick={handleClick} id="hobbies" type="button" className={`button-styless ms-3 mb-2 d-flex align-content-center d-md-none select-item ${isSelected.hobbies ? isSelected : ''}`}>
              <span className="material-icons"> book </span>
              Hobbies
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="d-none d-md-block col-sm-12 col-md-4 d-flex justify-content-center">
          {/* Aqui van hobbies */}
          <div className="d-flex w-75 align-content-center">
            <p className="d-flex align-content-center">
              <span className="material-icons"> book </span>
              Hobbies
            </p>
            <div className="ms-1 bottom-border" />
          </div>
          <ProfileItem
            contact={user.hobbies}
            type={0}
          />
        </div>
        <div className="col-sm-12 col-md-7 d-flex flex-column ms-2">
          {isSelected.contact
            ? (
              <ProfileItem
                contact={user.cursos}
                type={1}
              />
            ) : (
              <ProfileItem
                contact={user.cursos}
                type={0}
              />
            )}
        </div>
        <Report
          show={report}
          onHide={() => setReport(false)}
        />
      </div>

    </div>
  );
}

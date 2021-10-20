import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import ProfileItem from './profileItem';
import Report from './report';
import {
  USER_INFO, USER_INFO_AUT, SEND_REQUEST, DELETE_FRIEND, SENT_REQUESTS, CANCEL_REQUEST,
} from '../utils/rutas';

export default function Profile(props) {
  const [report, setReport] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const [reload, setReload] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const id = useParams();
  const location = useLocation();
  const item = props;
  const [isSelectedCourses, setIsSelectedCourses] = useState(true);
  const [isSelectedHobbies, setIsSelectedHobbies] = useState(false);
  const [isSelectedContact, setIsSelectedContact] = useState(false);
  const [image, setImage] = useState(false);
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
    console.log(e.target.name);
    if (e.target.name === 'contact') {
      setIsSelectedCourses(false);
      setIsSelectedHobbies(false);
      setIsSelectedContact(true);
    } else if (e.target.name === 'courses') {
      setIsSelectedCourses(true);
      setIsSelectedHobbies(false);
      setIsSelectedContact(false);
    } else if (e.target.name === 'hobbies') {
      setIsSelectedCourses(false);
      setIsSelectedHobbies(true);
      setIsSelectedContact(false);
    }
  };
  function addFriend() {
    const request = async () => {
      try {
        await Axios.post(SEND_REQUEST,
          {
            carne: user.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        alert(`Se ha enviado la solicitud al usuario ${user.carne}`);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function cancelRequest() {
    const request = async () => {
      try {
        await Axios.post(CANCEL_REQUEST,
          {
            carne: user.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setReload(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function pendingRequests(carne) {
    const request = async () => {
      try {
        const res = await Axios.get(SENT_REQUESTS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        res.data.forEach((student) => {
          if (student.carne === carne) {
            setPendingRequest(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function deleteFriend() {
    const request = async () => {
      try {
        await Axios.post(DELETE_FRIEND,
          {
            carne: user.carne,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        alert(`Se ha eliminado al usuario ${user.carne}`);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function userInfo() {
    const request = async () => {
      try {
        setIsUser(true);
        const res = await Axios.get(`${USER_INFO}${id.carne}`);
        console.log(res);
        setUser({
          carne: res.data[0].carne,
          nombre_completo: res.data[0].nombre_completo,
          carrera: res.data[0].carrera,
          correo: res.data[0].correo,
          cursos: res.data[0].cursos,
          hobbies: res.data[0].hobbies,
          redes_sociales: res.data[0].redes_sociales,
        });
        const img = new Image();
        img.src = `../../../public/assets/${res.data[0].carne}.png`;
        // eslint-disable-next-line no-unused-expressions
        img.width > 0
          ? setImage(true)
          : null;
        pendingRequests(res.data[0].carne);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  function userInfoAut() {
    const request = async () => {
      try {
        setIsUser(false);
        const res = await Axios.get(USER_INFO_AUT,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setUser({
          carne: res.data[0].carne,
          nombre_completo: res.data[0].nombre_completo,
          carrera: res.data[0].carrera,
          correo: res.data[0].correo,
          cursos: res.data[0].cursos,
          hobbies: res.data[0].hobbies,
          redes_sociales: res.data[0].redes_sociales,
        });
        const img = new Image();
        img.src = `../../../public/assets/${res.data[0].carne}.png`;
        // eslint-disable-next-line no-unused-expressions
        img.width > 0
          ? setImage(true)
          : null;
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  useEffect(() => {
    if (typeof id.carne === 'undefined') {
      userInfoAut();
    } else {
      userInfo();
    }
  }, [location]);
  return (
    <div id="profileContainer" className="container profile">
      <div className="row">
        <div className="col-sm-12 col-md-4 d-flex justify-content-center" id="profile-img">
          <img src={`../../../public/assets/${image ? `${user.carne}.png` : 'default.svg'}`} alt="Profile" className="w-75 align-self-center" />
        </div>
        <div className="col-sm-12 col-md-7 d-flex flex-column align-self-end">
          <div className="container addName">
            <div className="row">
              <div className="col-6">
                <h1>{` ${user.nombre_completo}`}</h1>
              </div>
              {(item.type === 1) ? (
                <>
                  <button id="addFriend" className="col-3 addIcon" type="button" onClick={!pendingRequest ? (addFriend) : (cancelRequest)}>
                    {pendingRequest ? (
                      <p>Cancelar solicitud </p>
                    ) : (
                      <p>Agregar amigo </p>

                    )}
                    <span className="material-icons add">
                      person_add
                    </span>
                  </button>
                </>
              ) : null}
              {(item.type === 2) ? (
                <>
                  <button id="addFriend" className="col-3 deleteIcon" type="button" onClick={deleteFriend}>
                    <span className="material-icons add">
                      remove_circle_outline
                    </span>
                    <p>  Eliminar amigo</p>
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <h5>{` ${user.carrera}`}</h5>
          <h4 className="mt-4">
            Carné:
            {` ${user.carne}`}
          </h4>
          <div className="d-flex border-1 border-bottom mt-4">
            <button onClick={handleClick} name="courses" id="courses" type="button" className={`button-styless ms-3 mb-2 d-flex align-content-center select-item ${isSelectedCourses ? 'isSelected' : ''}`}>
              <span className="material-icons"> library_books </span>
              Cursos
            </button>
            <button onClick={handleClick} name="contact" id="contact" type="button" className={`button-styless mb-2 d-flex align-content-center select-item ${isSelectedContact ? 'isSelected' : ''}`}>
              <span className="material-icons"> person </span>
              Contacto
            </button>
            <button onClick={handleClick} name="hobbies" id="hobbies" type="button" className={`button-styless ms-3 mb-2 d-flex align-content-center d-md-none select-item ${isSelectedHobbies ? 'isSelected' : ''}`}>
              <span className="material-icons"> book </span>
              Hobbies
            </button>
            {item.type === 1
              ? (
                <button onClick={() => setReport(true)} id="report" type="button" className="button-report ms-3 mb-2 d-flex align-content-center">
                  <span className="material-icons"> report </span>
                  <p>
                    Reportar
                  </p>
                </button>

              ) : null}
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
          {isSelectedContact
            ? (
              <ProfileItem
                contact={user.redes_sociales}
                type={1}
              />
            ) : (
              <ProfileItem
                contact={user.cursos}
                type={0}
              />
            )}
        </div>
        {item.type === 2
          ? (
            <Report
              show={report}
              onHide={() => setReport(false)}
            />
          ) : null}
      </div>

    </div>
  );
}

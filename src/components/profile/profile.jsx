import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Search from '../utils/search';
import ProfileItem from './profileItem';
import Report from './report';
import {
  USER_INFO, USER_INFO_AUT, SEND_REQUEST, DELETE_FRIEND, SENT_REQUESTS, CANCEL_REQUEST,
} from '../utils/rutas';

export default function Profile(props) {
  const [report, setReport] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [cursosUsuario, setCursosUsuario] = useState([]);
  const [hobbiesUsuario, setHobbiesUsuario] = useState([]);
  const cursos = Search.searchCourses();
  const hobbies = Search.searchHobbies();
  const [edit, setEdit] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const [reload, setReload] = useState(false);
  const animatedComponents = makeAnimated();
  const img = new Image();
  const cookies = new Cookies();
  const token = cookies.get('session');
  const id = useParams();
  const location = useLocation();
  const item = props;
  const [isSelectedCourses, setIsSelectedCourses] = useState(true);
  const [isSelectedHobbies, setIsSelectedHobbies] = useState(true);
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
  const [user2, setUser2] = useState({
    hobbies: [],
    cursos: [],
    facebook: '',
    instagram: '',
    phone: 0,
  });
  const handleClick = (e) => {
    if (e.target.name === 'contact') {
      setIsSelectedCourses(false);
      setIsSelectedContact(true);
      if (window.screen.width < 716) {
        setIsSelectedHobbies(false);
      }
    } else if (e.target.name === 'courses') {
      setIsSelectedCourses(true);
      setIsSelectedContact(false);
      if (window.screen.width < 716) {
        setIsSelectedHobbies(false);
      }
    } else if (e.target.name === 'hobbies') {
      setIsSelectedCourses(false);
      setIsSelectedContact(false);
      if (window.screen.width < 716) {
        setIsSelectedHobbies(true);
      }
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
        setUser({
          carne: res.data[0].carne,
          nombre_completo: res.data[0].nombre_completo,
          carrera: res.data[0].carrera,
          correo: res.data[0].correo,
          cursos: res.data[0].cursos,
          hobbies: res.data[0].hobbies,
          redes_sociales: res.data[0].redes_sociales,
        });
        img.src = `../../../public/assets/${id.carne}.png`;
        // eslint-disable-next-line no-unused-expressions
        img.onload = function () {
        // image exists and is loaded
          setImage(true);
        };
        img.onerror = function () {
        // image exists and is loaded
          setImage(false);
        };
        pendingRequests(res.data[0].carne);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }
  const onCoursesChange = (selectedCourses) => {
    selectedCourses.map((course) => (
      setUser({
        ...user,
        cursos: [...user.cursos, course.label],
      })
    ));
  };
  const onHobbiesChange = (selectedHobbies) => {
    selectedHobbies.map((hobbiesSelected) => (
      setUser({
        ...user,
        hobbies: [...user.hobbies, hobbiesSelected.label],
      })
    ));
  };
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
        img.src = `../../../public/assets/${res.data[0].carne}.png`;
        // eslint-disable-next-line no-unused-expressions,func-names
        img.onload = function () {
        // image exists and is loaded
          setImage(true);
        };
        // eslint-disable-next-line func-names
        img.onerror = function () {
        // image exists and is loaded
          setImage(false);
        };
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }

  function editProfile() {
    const coursesUser = [];
    const hobbiesUser = [];
    setCursosUsuario([]);
    for (let i = 0; i < cursos.length; i += 1) {
      for (let j = 0; j < user.cursos.length; j += 1) {
        if (cursos[i].label === user.cursos[j].replace(/:/g, '')) {
          coursesUser.push({ label: cursos[i].label, value: cursos[i].value });
        }
      }
    }
    for (let i = 0; i < hobbies.length; i += 1) {
      for (let j = 0; j < user.hobbies.length; j += 1) {
        if (hobbies[i].label === user.hobbies[j]) {
          hobbiesUser.push({ label: hobbies[i].label, value: hobbies[i].value });
        }
      }
    }
    setCursosUsuario(
      coursesUser,
    );
    setHobbiesUsuario(
      hobbiesUser,
    );
    setEdit(!edit);
  }
  const handleInputChange = (e) => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      setUser2({
        ...user2,
        [e.target.name]: e.target.value,
      });
    }
  };
  useEffect(() => {
    if (window.screen.width < 716) {
      setIsSelectedHobbies(false);
    }
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
                {(true) ? (
                  <h1>{` ${user.nombre_completo}`}</h1>
                ) : (
                  <input
                    className="input ms-1"
                    type="text"
                    name="nombre_completo"
                    placeholder={user.nombre_completo}
                    onInput={handleInputChange}
                    value={user.nombre_completo}
                  />
                )}
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
              {(item.type === 0) ? (
                <>
                  <button id="addFriend" className="col-3 editIcon" type="button" onClick={editProfile}>
                    <span className="material-icons add">
                      edit
                    </span>
                    {!edit ? (
                      <p>Editar perfil</p>
                    ) : (
                      <p>Confirmar</p>
                    )}
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
            {item.friend ? (
              <button onClick={handleClick} name="contact" id="contact" type="button" className={`button-styless mb-2 d-flex align-content-center select-item ${isSelectedContact ? 'isSelected' : ''}`}>
                <span className="material-icons"> person </span>
                Contacto
              </button>
            ) : null}
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
          {(isSelectedHobbies && edit) && (
            <div className="editsHobbies">
              <Select
                isMulti
                closeMenuOnSelect
                components={animatedComponents}
                placeholder="Ingresa tus hobbies"
                defaultValue={hobbiesUsuario}
                value={hobbies.find((obj) => obj.value === user2.hobbies)}
                onChange={onHobbiesChange}
                options={hobbies}
              />
            </div>
          )}
          {(isSelectedHobbies && !edit) && (
            <ProfileItem
              contact={user.hobbies}
              type={0}
            />
          )}
        </div>
        <div className="col-sm-12 col-md-7 d-flex flex-column ms-2">
          {(isSelectedCourses && edit) && (
            <div className="editsCourses">
              <Select
                isMulti
                closeMenuOnSelect
                components={animatedComponents}
                placeholder="Agrega tus cursos"
                defaultValue={cursosUsuario}
                value={cursos.find((obj) => obj.value === user2.cursos)}
                onChange={onCoursesChange}
                options={cursos}
              />
            </div>
          )}
          {(isSelectedContact && edit) && (
            null
          )}
          {(isSelectedContact && !edit) && (
          <ProfileItem
            contact={user.redes_sociales}
            type={1}
          />
          )}
          {(isSelectedCourses && !edit) && (
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

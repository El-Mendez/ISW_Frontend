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
  USER_INFO, USER_INFO_AUT, SEND_REQUEST,
  DELETE_FRIEND, SENT_REQUESTS, CANCEL_REQUEST,
  ASSIGN_HOBBY, ASSIGN_SECTION, SEARCH_IMG,
  UPLOAD_IMG,
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
  const [file, setFile] = useState('');
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
  function ping() {
    const request = async () => {
      try {
        const res = await Axios.get(AUTH,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log(res);
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
        img.src = `${SEARCH_IMG}/${id.carne}.png`;
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
  function assignCourse(courseId) {
    const obj = courseId;
    const request = async () => {
      try {
        await Axios.post(ASSIGN_SECTION,
          {
            seccionesId: obj,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    };
    request();
  }
  function deleteCourse(courseId) {
    const request = async () => {
      const obj = courseId;
      try {
        await Axios.delete(ASSIGN_SECTION,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              seccionesId: obj,
            },
          });
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    };
    request();
  }
  const onCoursesChange = (selectedCourses) => {
    setCursosUsuario(
      selectedCourses,
    );
  };
  function assignHobbie(hobbieId) {
    const obj = hobbieId;
    const request = async () => {
      try {
        await Axios.post(ASSIGN_HOBBY,
          {
            hobbiesId: obj,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    };
    request();
  }
  function deleteHobbie(hobbieId) {
    const obj = hobbieId;
    const request = async () => {
      try {
        await Axios.delete(ASSIGN_HOBBY,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              hobbiesId: obj,
            },
          });
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    };
    request();
  }
  const onHobbiesChange = (selectedHobbies) => {
    setHobbiesUsuario(
      selectedHobbies,
    );
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
        img.src = `${SEARCH_IMG}/${res.data[0].carne}.png`;
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
  const onImageChange = (e) => {
    setFile(e.target.files[0]);
    setImage({
      temp_path: URL.createObjectURL(e.target.files[0]),
    });
  };
  const loadImage = async () => {
    const data = new FormData();
    data.append('file', file);
    try {
      await Axios.post(UPLOAD_IMG,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
    } catch (e) {
      console.log(e.response);
    }
  };
  function checkEditData() {
    const newsHobbies = [];
    const newsCourses = [];
    const hobbiesToDelete = [];
    const coursesToDelete = [];
    const hobbiesUsuarioLabel = [];
    const hobbiesUsuarioValue = [];
    const coursesUsuarioLabel = [];
    const coursesUsuarioValue = [];
    for (let i = 0; i < hobbiesUsuario.length; i += 1) {
      if (!user.hobbies.includes(hobbiesUsuario[i].label)) {
        newsHobbies.push(hobbiesUsuario[i].value);
      }
    }
    for (let i = 0; i < cursosUsuario.length; i += 1) {
      if (!user.cursos.includes(cursosUsuario[i].label)) {
        newsCourses.push(cursosUsuario[i].value);
      }
    }
    hobbiesUsuario.forEach((obj) => {
      hobbiesUsuarioLabel.push(obj.label);
    });
    cursosUsuario.forEach((obj) => {
      coursesUsuarioLabel.push(obj.label);
    });
    for (let i = 0; i < user.hobbies.length; i += 1) {
      if (!hobbiesUsuarioLabel.includes(user.hobbies[i])) {
        hobbiesToDelete.push(user.hobbies[i]);
      }
    }
    for (let i = 0; i < user.cursos.length; i += 1) {
      if (!coursesUsuarioLabel.includes(user.cursos[i])) {
        coursesToDelete.push(user.cursos[i]);
      }
    }
    hobbies.forEach((obj) => {
      for (let i = 0; i < hobbiesToDelete.length; i += 1) {
        if (obj.label === hobbiesToDelete[i]) {
          hobbiesUsuarioValue.push(obj.value);
        }
      }
    });
    cursos.forEach((obj) => {
      for (let i = 0; i < coursesToDelete.length; i += 1) {
        if (obj.label === coursesToDelete[i]) {
          coursesUsuarioValue.push(obj.value);
        }
      }
    });
    if (hobbiesUsuarioValue.length > 0) {
      deleteHobbie(hobbiesUsuarioValue);
    }
    if (newsHobbies.length > 0) {
      assignHobbie(newsHobbies);
    }
    if (coursesUsuarioValue.length > 0) {
      deleteCourse(coursesUsuarioValue);
    }
    if (newsCourses.length > 0) {
      assignCourse(newsCourses);
    }
    setUser({
      ...user,
      hobbies: hobbiesUsuarioLabel,
      cursos: coursesUsuarioLabel,
    });
    if (image.temp_path) {
      loadImage();
      alert('Puede ser que la imagen tarde unos segundos en actualizarse...');
    }
  }

  function editProfile() {
    if (!edit) {
      const coursesUser = [];
      const hobbiesUser = [];
      setCursosUsuario([]);
      setHobbiesUsuario([]);
      for (let i = 0; i < cursos.length; i += 1) {
        for (let j = 0; j < user.cursos.length; j += 1) {
          if (cursos[i].label === user.cursos[j]) {
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
    } else {
      checkEditData();
      setEdit(!edit);
    }
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
        <div className="col-sm-12 col-md-4 d-flex justify-content-center prueba flex-column" id="profile-img">
          <img src={image.temp_path || `${SEARCH_IMG}/${image ? `${user.carne}.png` : 'default.svg'}`} alt="Profile" className="w-75 align-self-center" />
          {edit ? (
            <>
              <label
                htmlFor="file-upload"
                className="custom-file-upload align-self-center mt-2 d-flex justify-content-center btn-fill"
                style={{ width: '100%' }}
              >
                <span className="material-icons me-2">
                  file_upload
                </span>
                <div>Seleccionar una imagen...</div>
              </label>
              <input type="file" id="file-upload" onChange={onImageChange} />
            </>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-7 d-flex flex-column align-self-end">
          <div className="container addName">
            <div className="row">
              <div className="col-xs-12 col-lg-6">
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
                  <button id="addFriend" className="py-2 col-xs-12 col-lg-6 addIcon" type="button" onClick={!pendingRequest ? (addFriend) : (cancelRequest)}>
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
                  <button id="addFriend" className="py-2 col-xs-12 col-lg-6 deleteIcon" type="button" onClick={deleteFriend}>
                    <span className="material-icons add">
                      remove_circle_outline
                    </span>
                    <p>  Eliminar amigo</p>
                  </button>
                </>
              ) : null}
              {(item.type === 0) ? (
                <>
                  <button id="addFriend" className="py-2 col-xs-12 col-lg-6 editIcon" type="button" onClick={editProfile}>
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
          <h3>{` ${user.carrera}`}</h3>
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
                isClearable={false}
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
                isClearable={false}
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
        {item.type === 1
          ? (
            <Report
              show={report}
              onHide={() => setReport(false)}
              user={user.carne}
            />
          ) : null}
      </div>

    </div>
  );
}

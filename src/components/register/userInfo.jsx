import React, { useState, useEffect, createRef } from 'react';
import Cropper from 'cropperjs';
import { useForm } from 'react-hook-form';
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si';
import Cookies from 'universal-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from 'axios';
import history from '../utils/history';
import {
  SEARCH_HOBBY, SEARCH_COURSE, ASSIGN_HOBBY, ASSIGN_SECTION,
} from '../utils/rutas';

const schema = z.object({
  facebook: z.string(),
  instagram: z.string(),
});

function UserInfo() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'On Change',
    resolver: zodResolver(schema),
  });

  const animatedComponents = makeAnimated();
  const cookies = new Cookies();
  const token = cookies.get('session');
  const [hobbies, setHobbies] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [file, setFile] = useState('');
  const [uploadImage, setUploadImage] = useState();
  const [tempImg, setTempImg] = useState('');
  const image = createRef();

  const [user, setUser] = useState({
    hobbies: [],
    cursos: [],
    facebook: '',
    instagram: '',
    phone: 0,
  });

  const [filled, setFilled] = useState({
    facebook: false,
    instagram: false,
    phone: false,
  });

  // Requests para mostrar cursos y hobbies al usuario
  function searchHobbies() {
    const fetchData = async () => {
      try {
        const res = await Axios.get(SEARCH_HOBBY);
        res.data.map((item) => (
          setHobbies((prevState) => [...prevState, { value: item.id, label: item.nombre }])
        ));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  function searchCursos() {
    const fetchData = async () => {
      try {
        const res = await Axios.get(SEARCH_COURSE);
        res.data.map((item) => (
          item.secciones.map((section) => (
            setCursos((prevState) => [...prevState, {
              value: section.seccionId,
              label: `${item.cursoNombre} → sección ${section.seccion}`,
            }])
          ))
        ));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    searchHobbies();
    searchCursos();

    const cropper = new Cropper(image.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        setTempImg(canvas.toDataURL('image/png'));
      },

    });
  }, []);

  function assignSection() {
    const request = async () => {
      try {
        await Axios.post(ASSIGN_SECTION,
          {
            seccionesId: user.cursos,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }

  function assignHobby() {
    const request = async () => {
      try {
        await Axios.post(ASSIGN_HOBBY,
          {
            hobbiesId: user.hobbies,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }

  const loadImage = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('carne', 191025);
    try {
      const res = await Axios.post('http://localhost:3000/free/profile/image',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      console.log(res);
      setUploadImage(res.data.name);
    } catch (e) {
      console.log(e);
    }
  };

  const onHobbiesChange = (selectedHobbies) => {
    selectedHobbies.map((item) => (
      setUser({
        ...user,
        hobbies: [...user.hobbies, item.value],
      })
    ));
  };

  const onCoursesChange = (selectedCourses) => {
    selectedCourses.map((item) => (
      setUser({
        ...user,
        cursos: [...user.cursos, item.value],
      })
    ));
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    if (e.target.value !== '') {
      setFilled({
        ...filled,
        [e.target.name]: true,
      });
    } else {
      setFilled({
        ...filled,
        [e.target.name]: false,
      });
    }
  };

  const onSubmit = () => {
    assignSection();
    assignHobby();
    loadImage();
    setTimeout(() => {
      history.push('/home');
      history.go();
    }, 1000);
  };

  const onImageChange = (e) => {
    setFile(e.target.files[0]);
    setFile(e.target.files[0].name);
  };

  return (
    <div className="container px-0 bg-secondary pt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* DATA */}
        <div>
          <div className="img-container">
            <img src={`../../../public/assets/${uploadImage || 'default.svg'}`} alt="Source" ref={image} />
          </div>
          <img src={tempImg} alt="Destination" className="img-preview" />
        </div>
        <div className="container px-5 my-5">
          <div className="d-flex align-items-center px-0">
            <div className="progress-activate-circle d-flex justify-content-center activate me-3">
              <h2 className="progress-number">1</h2>
            </div>
            <h1>Personaliza tu perfil</h1>
          </div>
          {/* Foto de perfil */}
          <div className="d-flex flex-column justify-content-center align-content-center">
            <img
              src={`../../../public/assets/${uploadImage || 'default.svg'}`}
              alt="Profile"
              className="w-25 rounded-circle align-self-center"
            />
            <label
              htmlFor="file-upload"
              className="custom-file-upload align-self-center mt-2 d-flex justify-content-center btn-fill"
            >
              <span className="material-icons me-2">
                file_upload
              </span>
              <div>Seleccionar una imagen...</div>
            </label>
            <input type="file" id="file-upload" onChange={onImageChange} />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.facebook
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.facebook?.message}
            </div>
          </small>
        </div>
        <div className="container px-5 my-5">
          <div className="d-flex align-items-center px-0">
            <div className="progress-activate-circle d-flex justify-content-center activate me-3">
              <h2 className="progress-number">1</h2>
            </div>
            <h1>Información Personal</h1>
          </div>
          {/* Cursos */}
          <div className="mt-z4">
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Agrega tus cursos"
              value={cursos.find((obj) => obj.value === user.cursos)}
              onChange={onCoursesChange}
              options={cursos}
            />
          </div>
          {/* Hobbies */}
          <div className="mt-z4">
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Agrega tus hobbies"
              value={hobbies.find((obj) => obj.value === user.hobbies)}
              onChange={onHobbiesChange}
              options={hobbies}
            />
          </div>
        </div>
        <div className="container px-5">
          <div className="d-flex align-items-center px-0">
            <div className="progress-activate-circle d-flex justify-content-center activate me-3">
              <h2 className="progress-number">3</h2>
            </div>
            <div className="d-flex align-items-center">
              <h1>Información de Contacto</h1>
              <p className="text-small m-0 ms-2">(Opcional)</p>
            </div>
          </div>
          {/* Facebook */}
          <div className="input-container mt-3">
            <span className={`material-icons input-icon ${filled.facebook ? 'is-filled' : ' '}`}>
              <SiFacebook />
            </span>
            <input
              className="input ms-1"
              type="text"
              name="facebook"
              placeholder="Perfil de Facebook"
              onInput={handleInputChange}
              {...register('facebook')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.facebook
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.facebook?.message}
            </div>
          </small>
          {/* Instagram */}
          <div className="input-container mt-3">
            <span className={`material-icons input-icon ${filled.instagram ? 'is-filled' : ' '}`}>
              <SiInstagram />
            </span>
            <input
              className="input ms-1"
              type="text"
              name="instagram"
              placeholder="Perfil de Instagram"
              onInput={handleInputChange}
              {...register('instagram')}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.instagram
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.instagram?.message}
            </div>
          </small>
          {/* Phone number */}
          <div className="input-container mt-3">
            <span className={`material-icons input-icon ${filled.phone ? 'is-filled' : ' '}`}>
              <SiWhatsapp />
            </span>
            <input
              className="input ms-1"
              type="phone"
              name="phone"
              placeholder="Número de teléfono"
              onInput={handleInputChange}
            />
          </div>
          <small className="text-danger text-small d-block mb-2 mt-1">
            <div className="d-flex align-items-center ps-2">
              {errors.phone
                ? <span className="material-icons me-1">error_outline</span>
                : null}
              {errors.phone?.message}
            </div>
          </small>

        </div>
        {/* NEXT BUTTON */}
        <div className="d-flex bg-gold w-100 mt-5 justify-content-end">
          <button onSubmit={onSubmit} className="btn btn-data my-1 me-3" type="submit">
            SIGUIENTE
            <span
              className="material-icons position-absolute ms-1"
            >
              arrow_forward
            </span>
          </button>
        </div>
      </form>
    </div>

  );
}

export default UserInfo;

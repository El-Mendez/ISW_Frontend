import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si';
import Cookies from 'universal-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from 'axios';
import history from '../utils/history';
import { contact } from '../utils/schemas';
import { ASSIGN_HOBBY, ASSIGN_SECTION } from '../utils/rutas';
import * as Search from '../utils/search';
import * as Assign from '../utils/assign';
import Input from '../utils/input';
import Circle from '../utils/circle_number';

export default function UserInfo() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'On Change',
    resolver: zodResolver(contact),
  });

  const animatedComponents = makeAnimated();
  const cookies = new Cookies();
  const token = cookies.get('session');
  const hobbies = Search.searchHobbies();
  const cursos = Search.searchCourses();
  const [file, setFile] = useState('');
  const [image, setImage] = useState({
    temp_path: null,
  });

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

  const loadImage = async () => {
    const data = new FormData();
    data.append('file', file);
    try {
      // TODO cambiar por la ruta del server
      await Axios.post('http://meetinguvg.me/free/profile/image',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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

  const onImageChange = (e) => {
    setFile(e.target.files[0]);
    setFile(e.target.files[0].name);
    setImage({
      temp_path: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onSubmit = () => {
    Assign(ASSIGN_HOBBY, user.hobbies, token);
    Assign(ASSIGN_SECTION, user.cursos, token);
    loadImage();
    setTimeout(() => {
      history.push('/home');
      history.go();
    }, 1000);
    console.log('test');
  };

  return (
    <div className="container px-0 bg-secondary pt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Profile image */}
        <div className="container px-5 my-5">
          <Circle title="Personaliza tu perfil" />
          {/* Foto de perfil */}
          <div className="d-flex flex-column justify-content-center align-content-center">
            <img
              src={image.temp_path || '../../../public/assets/default.svg'}
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
        </div>
        {/* Personal information */}
        <div className="container px-5 my-5">
          <Circle title="Información Personal" />
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
        {/* Contact information */}
        <div className="container px-5">
          <Circle title="Información de Contacto" />
          {/* Facebook */}
          <Input
            filled={filled.facebook}
            onChange={() => handleInputChange()}
            register={(register('facebook'))}
            errors={errors.facebook}
            icon={<SiFacebook />}
            holder="Perfil de Facebook"
          />
          {/* Instagram */}
          <Input
            filled={filled.instagram}
            onChange={() => handleInputChange()}
            register={(register('instagram'))}
            errors={errors.instagram}
            icon={<SiInstagram />}
            holder="Perfil de Instagram"
          />
          {/* Phone number */}
          <Input
            filled={filled.phone}
            onChange={() => handleInputChange()}
            register={(register('phone'))}
            errors={errors.phone}
            icon={<SiWhatsapp />}
            holder="Número de Teléfono"
          />
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

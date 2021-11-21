import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import history from '../utils/history';
import { ASSIGN_HOBBY, ASSIGN_SECTION, UPLOAD_IMG} from '../utils/rutas';
import * as Search from '../utils/search';
import * as Assign from '../utils/assign';
import Input from '../utils/input';
import Circle from '../utils/circle_number';

const schema = z.object({
  facebook: z.string(),
  instagram: z.string(),
});

export default function UserInfo() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'On Change',
    resolver: zodResolver(schema),
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
    setImage({
      temp_path: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onSubmit = () => {
    // Assign.assignHobbies(ASSIGN_HOBBY, user.hobbies, token);
    // Assign.assignCourses(ASSIGN_SECTION, user.cursos, token);
    loadImage();
    setTimeout(() => {
      history.push('/home');
      history.go();
    }, 1000);
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
              placeholder="Perfil de Facebook"
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
          <Input
            filled={filled.phone}
            onChange={(e) => handleInputChange(e)}
            // register={() => register('phone')}
            // errors={errors.phone}
            icon={<SiWhatsapp />}
            holder="Número de Teléfono"
            name="phone"
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

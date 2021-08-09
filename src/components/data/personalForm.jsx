import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import history from '../history';
import { SiInstagram, SiFacebook, SiWhatsapp } from "react-icons/si";
import Cookies from 'universal-cookie';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from "axios";
import {SEARCH_HOBBY, SEARCH_COURSE, ASSIGN_HOBBY, ASSIGN_SECTION} from "../utils/rutas";

const schema = z.object({
  facebook: z.string(),
  instagram: z.string(),
});

function PersonalForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'On Change',
    resolver: zodResolver(schema),
  });

  const animatedComponents = makeAnimated();
  const cookies = new Cookies();
  const token = cookies.get('session')
  const [hobbies, setHobbies] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [data, setData] = useState({
    hobbies: [],
    cursos: [],
    facebook: '',
    instagram: '',
    phone: 0
  });

  const [filled, setFilled] = useState({
    facebook: false,
    instagram: false,
    phone: false
  });

  useEffect(() => {
    searchHobbies();
    searchCursos();
  },[])

  // Requests
  function searchHobbies(){
    const fetchData = async () => {
      try {
        const res = await Axios.get(SEARCH_HOBBY);
        res.data.map(item => {
          setHobbies(prevState => {
            return [...prevState, {value: item.id, label: item.nombre}]
          })
        })
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  function searchCursos(){
    const fetchData = async () => {
      try {
        const res = await Axios.get(SEARCH_COURSE);
        res.data.map(item => {
          item.secciones.map(section => {
            setCursos(prevState => {
              return [...prevState, {value: section.seccionId, label: item.cursoNombre + ' → sección ' + section.seccion}]
          })
          })
        })
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  function assignSection(){
    const request = async () => {
      try {
        const { data } = await Axios.post(ASSIGN_SECTION,
            {
              seccionId: data.cursos
            },
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }
        );
        setSession(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  };

  function assignHobby(){
    const request = async () => {
      try {
        const { data } = await Axios.post(ASSIGN_HOBBY,
            {
              hobbyId: data.hobbies
            },
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }
        );
        setSession(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  };

  const onHobbiesChange = selectedHobbies => {
    selectedHobbies.map(item => {
      setData({
        ...data,
        hobbies: item.value
      })
    })

  }

  const onCoursesChange = selectCourses => {
    selectCourses.map(item => {
      console.log(item)
      setData({
        ...data,
        cursos: [...data.cursos, item.value]
      })
    })

  }

  const handleInputChange = (e) => {
    setData({
      ...data,
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

  const onSubmit = (datos) => {
    console.log(data.cursos)
    try{
      assignSection();
      assignHobby();
      history.push('/home');
      history.go();
    }catch (e){
      console.log(e)
    }
  }

  return (
    <div className="container px-0 bg-secondary pt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* DATA */}
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
                placeholder="Cursos"
                value={cursos.find(obj => obj.value === data.cursos)}
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
                placeholder="Hobbies"
                value={hobbies.find(obj => obj.value === data.hobbies)}
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
              <h1>Información de Contacto</h1>
            </div>
          {/* Facebook */}
          <div className="input-container mt-3">
             <span className={`material-icons input-icon ${filled.facebook ? 'is-filled' : ' '}`}>
                <SiFacebook/>
            </span>
            <input
                className="input ms-1"
                type="facebook"
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
                  : null
              }
              {errors.facebook?.message}
            </div>
          </small>
          {/* Instagram */}
          <div className="input-container mt-3">
             <span className={`material-icons input-icon ${filled.instagram ? 'is-filled' : ' '}`}>
                <SiInstagram/>
            </span>
            <input
                className="input ms-1"
                type="instagram"
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
                  : null
              }
              {errors.instagram?.message}
            </div>
          </small>
          {/* Phone number */}
          <div className="input-container mt-3">
             <span className={`material-icons input-icon ${filled.phone ? 'is-filled' : ' '}`}>
                <SiWhatsapp/>
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
                  : null
              }
              {errors.phone?.message}
            </div>
          </small>
        </div>
        {/* NEXT BUTTON */}
        <div className="d-flex bg-gold w-100 mt-5 justify-content-end">
          <button onSubmit={onSubmit} className={`btn btn-data my-1 me-3`}>SIGUIENTE
            <span
            className="material-icons position-absolute ms-1">arrow_forward</span></button>
        </div>
      </form>
    </div>

  );
}

export default PersonalForm;

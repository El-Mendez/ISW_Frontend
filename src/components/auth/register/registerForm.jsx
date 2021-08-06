import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import history from '../../history';
import Cookies from 'universal-cookie';
import { SIGNUP, SEARCH_CAREER } from '../../utils/rutas';
import Select from 'react-select';
import logo from "../../../assets/logo.svg";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validación de datos ingresados por el usuario
const schema = z.object({
    carne: z.string().min(3, {message: 'EL mínimo de un carné UVG es de 3 dígitos'}),
    nombre: z.string().nonempty({message: 'Ingresa un nombre'}),
    apellido: z.string().nonempty({message: 'Ingresa un apellido'}),
    password: z.string().nonempty({ message: 'Ingrese una contraseña' }).min(8, { message: 'Mínimo 8 caracteres' }),
});

export default function Register() {

    const cookies = new Cookies();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode:'onChange',
        resolver: zodResolver(schema),
    });

    const [result, setResult] = useState([]);

    const [user, setUser] = useState({
        carne: 0,
        nombre: '',
        apellido: '',
        carreraId: '',
        password: '',
    });

    const [filled, setFilled] = useState({
        carne: false,
        nombre: false,
        apellido: false,
        password: false,
    });


    useEffect(() => {
        searchCareer();
    }, [])

    // Búsqueda de carreras por lo que ingrese el usuario
    function searchCareer(){
        const fetchData = async () => {
            try {
                const res = await Axios.get(SEARCH_CAREER);
                res.data.map(item => {
                    setResult(prevState => {
                        return [...prevState, {value: item.id, label: item.nombre}]
                    })
                })
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };

    // Envía la información del usuario a la base de datos
    // Retorna error si el carné ya está guardado o no se pasaron todos los parámetros
    function signUp(){
        console.log("Loading...");
        console.log(user)
        console.log(user.carne, user.nombre, user.apellido)
        const fetchData = async () => {
            try {
                const { data } = await Axios.post(SIGNUP,
                    {
                        carne: user.carne,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        carreraId: user.carreraId,
                        password: user.password
                    }
                );
                cookies.set('session', data.token, {path: '/'})
                history.push(`/data`);
                history.go();
            } catch (error) {
                console.log(error);
                alert('El carné ingresado ya se encuentra registrado');
            }
        };
        fetchData();
    };

    // Actualiza los estados a medida que el usuario escribe
    const handleInputChange = (e) => {
        console.log(e.target.name)
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

    const handleChange = e => {
        setUser({
            ...user,
            carreraId: e.value
        }
    );
    }

    // Valida la información ingresada en el formulario y hace el request
    const onSubmit = (data) => {
        signUp();
    };

    return (
        <>
            <div className="register-container mx-3">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <p className="welcome">
                        BIENVENIDO A
                    </p>
                    <img src={logo} alt="Logo" className="img-size w-50"/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Carne */}
                    <div className="input-container">
                         <span className={`material-icons input-icon ${filled.carne ? 'is-filled' : ' '}`}>
                            assignment_ind
                        </span>
                        <input
                            className="input ms-1"
                            type="number"
                            name="carne"
                            placeholder="Número de carné"
                            onInput={handleInputChange}
                            {...register('carne')}
                        />
                    </div>
                    <small className="text-danger text-small d-block mb-2 mt-1">
                        <div className="d-flex align-items-center ps-2">
                            {errors.carne
                                ? <span className="material-icons me-1">error_outline</span>
                                : null
                            }
                            {errors.carne?.message}
                        </div>
                    </small>
                    {/* Nombre y Apellido */}
                    <div className="row">
                        {/* Nombre */}
                        <div className="col">
                            <div className="input-container">
                         <span className={`material-icons input-icon ${filled.nombre ? 'is-filled' : ' '}`}>
                            person
                        </span>
                                <input
                                    className="input ms-1"
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    onInput={handleInputChange}
                                    {...register('nombre')}
                                />
                            </div>
                            <small className="text-danger text-small d-block mb-2 mt-1">
                                <div className="d-flex align-items-center ps-2">
                                    {errors.nombre
                                        ? <span className="material-icons me-1">error_outline</span>
                                        : null
                                    }
                                    {errors.nombre?.message}
                                </div>
                            </small>
                        </div>
                        {/* Apellido */}
                        <div className="col">
                            <div className="input-container">
                         <span className={`material-icons input-icon ${filled.apellido ? 'is-filled' : ' '}`}>
                            person
                        </span>
                                <input
                                    className="input ms-1"
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    onInput={handleInputChange}
                                    {...register('apellido')}
                                />
                            </div>
                            <small className="text-danger text-small d-block mb-2 mt-1">
                                <div className="d-flex align-items-center ps-2">
                                    {errors.apellido
                                        ? <span className="material-icons me-1">error_outline</span>
                                        : null
                                    }
                                    {errors.apellido?.message}
                                </div>
                            </small>
                        </div>
                    </div>
                    {/* Carrera */}
                    <div className="mt-z4">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            value={result.find(obj => obj.value === user.carreraId)}
                            onChange={handleChange}
                            name="carreraId"
                            options={result}
                            theme={theme => ({
                                ...theme,
                                padding: '15px',
                            })}
                        />
                    </div>
                    <small className="text-danger text-small d-block mb-2 mt-1">
                        <div className="d-flex align-items-center ps-2">
                            {/*{errors.carne*/}
                            {/*    ? <span className="material-icons me-1">error_outline</span>*/}
                            {/*    : null*/}
                            {/*}*/}
                            {/*{errors.carne?.message}*/}
                        </div>
                    </small>
                    {/* Password */}
                    <div className="input-container">
                         <span className={`material-icons input-icon ${filled.password ? 'is-filled' : ' '}`}>
                            lock
                        </span>
                        <input
                            className="input ms-1"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onInput={handleInputChange}
                            {...register('password')}
                        />
                    </div>
                    <small className="text-danger text-small d-block mb-2 mt-1">
                        <div className="d-flex align-items-center ps-2">
                            {errors.password
                                    ? <span className="material-icons me-1">error_outline</span>
                                    : null
                            }
                            {errors.password?.message}
                        </div>
                    </small>
                    {/* LOGIN BUTTON */}
                    <div className="d-flex flex-column justify-content-center align-items-center mt-4 px-2">
                        <button onSubmit={onSubmit} className="btn-fill arrow-button w-50">Registrarse
                            <span
                                className="material-icons position-absolute ms-1">arrow_forward</span>
                        </button>
                        <a>¿Ya tienes cuenta? Inicia Sesión</a>
                    </div>
                </form>
            </div>
        </>
    );
}

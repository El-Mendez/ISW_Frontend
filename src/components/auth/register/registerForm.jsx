import React, { useState } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import history from '../../history';
import Cookies from 'universal-cookie';
import { SIGNUP } from '../../utils/rutas';


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

    const [user, setUser] = useState({
        carne: 0,
        nombre: '',
        apellido: '',
        carreraId: 0,
        password: '',
    });

    const [filled, setFilled] = useState({
        carne: false,
        nombre: false,
        apellido: false,
        password: false,
    });

    // Búsqueda de carreras por lo que ingrese el usuario


    // Envía la información del usuario a la base de datos
    // Retorna error si el carné ya está guardado o no se pasaron todos los parámetros
    function signUp(){
        console.log("Loading...");
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

    // Valida la información ingresada en el formulario y hace el request
    const onSubmit = (data) => {
        signUp();
    };

    return (
        <>
            <div className="auth-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Carne */}
                    <div className="input-container">
                         <span className={`material-icons input-icon ${filled.carne ? 'is-filled' : ' '}`}>
                            person
                        </span>
                        <input
                            className={`input ms-1 ${filled.carne ? 'is-filled' : ' '}`}
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
                    {/* Nombre */}
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
                    {/* Apellido */}
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
                    {/* Carrera */}
                    {/*<div className="input-container">*/}
                    {/*     <span className={`material-icons input-icon ${filled.apellido ? 'is-filled' : ' '}`}>*/}
                    {/*        person*/}
                    {/*    </span>*/}
                    {/*    <input*/}
                    {/*        className="input ms-1"*/}
                    {/*        type="text"*/}
                    {/*        name="apellido"*/}
                    {/*        placeholder="Apellido"*/}
                    {/*        onInput={handleInputChange}*/}
                    {/*        {...register('apellido')}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<small className="text-danger text-small d-block mb-2">*/}
                    {/*    /!* <Exclamation_icon/> *!/*/}
                    {/*    {errors.apellido?.message}*/}
                    {/*</small>*/}
                    {/* Password */}
                    <div className="input-container mt-3">
                         <span className={`material-icons input-icon ${filled.password ? 'is-filled' : ' '}`}>
                            lock
                        </span>
                        <input
                            className={`input ms-1 ${filled.password ? 'is-filled' : ' '}`}
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
                    <div className="d-flex justify-content-between align-items-center mt-4 px-2">
                        <a>¿Olvidaste tu contraseña?</a>
                        <button onSubmit={onSubmit} className="btn-fill arrow-button">INICIAR SESIÓN
                            <span
                                className="material-icons position-absolute ms-1">arrow_forward</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

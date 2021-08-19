import React, { useState} from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import history from '../history';
import Cookies from 'universal-cookie';
import { SIGNUP } from '../utils/rutas';
import logo from "../../assets/logo.svg";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validación de datos ingresados por el usuario
const schema = z.object({
    carne: z.string().nonempty({ message: 'Ingresa tu carné' }).min(3, { message: 'Mínimo 3 caracteres' }),
});

export default function Forgot_password() {

    const cookies = new Cookies();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode:'onChange',
        resolver: zodResolver(schema),
    });


    const [user, setUser] = useState({
        carne: '',
    });

    const [filled, setFilled] = useState({
        carne: false,
    });


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


    // Valida la información ingresada en el formulario y hace el request
    const onSubmit = (data) => {
        // signUp();
    };

    // Regresa al inicio de sesión
    const handleOnClick = () => {
        history.push(`/`);
        history.go();
    }

    return (
        <div className="vh-100 d-flex align-content-center justify-content-center bg-beige">
            <div className="forgot-password-container mx-3">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} alt="Logo" className="img-size w-50"/>
                    <h1 className="mt-1 ">Restablecimiento de contraseña</h1>
                    <p className="text-center poppins-font">Pon tu nombre de usuario de Spotify, o la dirección de correo electrónico que usaste para registrarte.
                        Te enviaremos un mensaje con tu nombre de usuario y un enlace para restablecer tu contraseña.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Carné */}
                    <div className="input-container">
                         <span className={`material-icons input-icon ${filled.carne ? 'is-filled' : ' '}`}>
                            assignment_ind
                        </span>
                        <input
                            className="input ms-1"
                            type="number"
                            name="carne"
                            placeholder="Carné"
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
                    {/* Send the reset password email button */}
                    {/* Cancel the request of reset password */}
                    <div className="d-flex flex-column justify-content-center align-items-center mt-4 px-2">
                        <button onSubmit={onSubmit} className="btn-fill arrow-button w-50">SIGUIENTE
                            <span
                                className="material-icons position-absolute ms-1">arrow_forward</span>
                        </button>
                        <button onClick={handleOnClick} className="btn-fill arrow-button w-50">CANCELAR
                            <span
                                className="material-icons position-absolute ms-1">arrow_forward</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

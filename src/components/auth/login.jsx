import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import history from '../history';
import logo from '../../assets/logo.svg';
import Cookies from 'universal-cookie';
import { LOGIN } from '../utils/rutas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Link} from "react-router-dom";

const clientId = "405374042535-g3sqooe9ncnj7lm394iu27u9vd99ma16.apps.googleusercontent.com";

const schema = z.object({
    carne: z.string().min(3, {message: 'EL mínimo de un carné UVG es de 3 dígitos'}),
    password: z.string().nonempty({ message: 'Ingrese una contraseña' }).min(8, { message: 'Mínimo 8 caracteres' }),
});


export default function Login(props) {

    const cookies = new Cookies();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [user, setUser] = useState({
        carne: 0,
        password: '',
    });

    const [filled, setFilled] = useState({
        carne: false,
        password: false,
    });

    function auth(){
        console.log("Loading...");
        const fetchData = async () => {
            try {
                const { data } = await Axios.post(LOGIN,
                    {
                        carne: user.carne,
                        password: user.password
                    }
                );
                cookies.set('session', data.token, {path: '/'})
                history.push(`/home`);
                history.go();
            } catch (error) {
                console.log(error);
                alert('Usuario o contraseña incorrectos');
            }
        };
        fetchData();
    };

    const googleLogin = (respuesta) =>{
        // token en respuesta.profileObj → necesito hacer un parser a json para extraer el token
        console.log(respuesta);
        console.log('Login Success:',respuesta.profileObj);
        console.log(respuesta.error);
        history.push(`/home`);
        history.go();
    };

    const onLoginFailure = () => {
        console.log('Login Failed:', res);
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

    const onSubmit = (data) => {
        auth();
    };

    const cleanUp = () => {
        setUser({
            carne: 0,
            password: ''
        })
        props.onHide()
    }

  return (
      <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          size="sm"
          centered>
        <Modal.Header className="bg-purple-dark">
          <Modal.Title id="contained-modal-title-vcenter">
              <div className="d-flex flex-column align-items-center">
                  <p className="welcome">
                      BIENVENIDO A
                  </p>
                  <img src={logo} alt="Logo" className="img-size w-50"/>
                  <p className="mt-1 description text-center px-4">
                      Inicia sesión y disfruta de una nueva experiencia mientras haces nuevos amigos
                  </p>
              </div>
          </Modal.Title>
            <button type="button" className="btn-close m-0" aria-label="Close" onClick={cleanUp}/>
        </Modal.Header>
        <Modal.Body>
            <div className="auth-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username */}
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
                    <small className="text-danger text-small d-block mb-2">
                        {/* <Exclamation_icon/> */}
                        {errors.carne?.message}
                    </small>
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
                    <small className="text-danger text-small d-block mb-2">
                        {/* <Exclamation_icon/> */}
                        {errors.password?.message}
                    </small>
                    {/* LOGIN BUTTON */}
                    <div className="d-flex justify-content-between align-items-center mt-4 px-2">
                        <Link to='/reset-password' className="ms-1 text-gold">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <button onSubmit={onSubmit} className="btn-fill arrow-button">INICIAR SESIÓN
                            <span
                                className="material-icons position-absolute ms-1">arrow_forward</span>
                        </button>
                    </div>
                </form>
                <span className="divider">○</span>
                {/* Google */}
                <div>
                    <GoogleLogin
                        clientId= {clientId}
                        buttonText = "Continúa con Google"
                        onSuccess={googleLogin}
                        onFailure={onLoginFailure}
                        hostedDomain={"uvg.edu.gt"}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </Modal.Body>
      </Modal>
  );
}

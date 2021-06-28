import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import history from '../history';
import GoogleLog from '../login/GoogleLogin';


import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    username: z.string().nonempty({ message: 'Ingresa un usuario' }),
    password: z.string().nonempty({ message: 'Ingresa una contraseña' }).min(8, { message: 'Mínimo 8 caracteres' }),
});


export default function ModalLogin(props) {

    const get_user = 'http://api.meetinguvg.me/api/login/';

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const [filled, setFilled] = useState({
        username: false,
        password: false,
    });

    function getUser(){
        console.log("Loading...");
        const fetchData = async () => {
            try {
                const { data } = await Axios.post(get_user,
                    {
                        username: user.username,
                        password: user.password
                    }
                );
                history.push(`/data`);
                history.go();
            } catch (error) {
                console.log(error);
                alert('Usuario o contraseña incorrectos');
            }
        };
        fetchData();
    };

    const googleLogin = (respuesta) =>{
        console.log(respuesta);
        console.log(respuesta.profileObj);
        console.log(respuesta.error);
        if (respuesta.error !== 'popup_closed_by_user'){
            history.push(`/data`);
            history.go();
        }
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        console.log('wtf');
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
        console.log(data);
        getUser();
    };


  return (
      <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          size="sm"
          centered>
        <Modal.Header className="bg-purple-dark">
          <Modal.Title id="contained-modal-title-vcenter">
                  <p className="modalHeader my-2">
                      INICIAR SESIÓN
                  </p>
          </Modal.Title>
            <button type="button" className="btn-close m-0" aria-label="Close" onClick={props.onHide}/>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                {/* G */}
                <div>
                    <GoogleLogin
                        clientId= "405374042535-g3sqooe9ncnj7lm394iu27u9vd99ma16.apps.googleusercontent.com"
                        buttonText = "Ingresar con Google"
                        onSuccess={googleLogin}
                        onFailure={googleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username */}
                    <div className="position-relative mt-2">
                        <input
                            className={`input ${filled.username ? 'is-filled' : ' '}`}
                            type="text"
                            name="username"
                            onInput={handleInputChange}
                            {...register('username')}
                        />
                        <label className="label">Usuario</label>
                        <small className="text-danger text-small d-block mb-2">
                            {/* <Exclamation_icon/> */}
                            {errors.username?.message}
                        </small>
                    </div>
                    {/* Password */}
                    <div className="position-relative mt-2">
                        <input
                            className={`input ${filled.username ? 'is-filled' : ' '}`}
                            type="password"
                            name="password"
                            onInput={handleInputChange}
                            {...register('password')}
                        />
                        <label className="label">Contraseña</label>
                        <small className="text-danger text-small d-block mb-2">
                            {/* <Exclamation_icon/> */}
                            {errors.password?.message}
                        </small>
                    </div>
                    {/* LOGIN BUTTON */}
                    <button onSubmit={onSubmit} className="btn btn-meeting btn-fill my-3 w-100">INICIA SESIÓN</button>
                </form>
            </div>
        </Modal.Body>
      </Modal>
  );
}

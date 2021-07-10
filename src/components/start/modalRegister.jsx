import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import history from '../utils/history';


import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    email: z.string().nonempty({ message: 'Ingresa un usuario' }).email({message: 'Ingresa un correo válido'}),
    username: z.string().nonempty({ message: 'Ingresa un usuario' }),
    password: z.string().nonempty({message: 'Ingresa una contraseña'}).min(8,{message: 'Mínimo 8 caracteres'}),
});


export default function ModalRegister(props) {

    const post_user = 'http://api.meetinguvg.me/api/register/';

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
    });

    const [filled, setFilled] = useState({
        email: false,
        username: false,
        password: false,
    });

    const createUser = () =>{
        const fetchData = async () =>{
            try{
                const { data } = await Axios.post(post_user,
                    {
                        username: registerData.username,
                        email: registerData.email,
                        password: registerData.password,
                    }
                );
                history.push(`/home`);
                history.go();
            } catch (error){
                console.log(error)
                alert("Usuario o correo ya existente. Prueba con un correo o un usuario distinto")
            }
        }
        fetchData();
    };


    const handleInputChange = (e) => {
        console.log(e.target.value);
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
        createUser();
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
                       REGISTRARSE
                    </p>
                </Modal.Title>
                <button type="button" className="btn-close m-0" aria-label="Close" onClick={props.onHide}/>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="position-relative mt-2">
                            <input
                                className={`input ${filled.email ? 'is-filled' : ' '}`}
                                type="text"
                                name="email"
                                onInput={handleInputChange}
                                {...register('email')}
                            />
                            <label className="label">Correo electrónico</label>
                            <small className="text-danger text-small d-block mb-2">
                                {/* <Exclamation_icon/> */}
                                {errors.email?.message}
                            </small>
                        </div>
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
                                className={`input ${filled.password ? 'is-filled' : ' '}`}
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
                        {/*REGISTER BUTTON*/}
                        <button onSubmit={onSubmit} className={`btn btn-meeting btn-fill my-3 w-100`}>REGISTRARTE</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

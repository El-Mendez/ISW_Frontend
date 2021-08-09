import React from 'react';
import RegisterForm from './registerForm';
import friends from '../../../assets/friends.svg';


// Diseñar ventana para registrarse
export default function Register() {
    return (
        <div className="row justify-content-center h-100">
            <div className="col-md-12 col-lg-6 col-xl-5 m-auto align-self-center mx-md-4">
                <RegisterForm/>
            </div>
            <div className="col align-self-center d-flex flex-column">
                <h2 className="mt-1 text-center px-4">
                    Regístrate y amplía tu circulo social con tan solo un click
                </h2>
                <img src={friends} alt="Friends" className="w-100"/>
            </div>

        </div>
    );
}

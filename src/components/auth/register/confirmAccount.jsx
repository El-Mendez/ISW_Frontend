import React from 'react';
import logo from "../../../assets/logo.svg";
import history from "../../utils/history";

export default function ConfirmAccount() {

    const handleClick = () => {
        history.push('/data')
        history.go()
    }

    return (
        <div className="vh-100 d-flex align-content-center justify-content-center bg-beige">
            <div className="forgot-password-container mx-4">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} alt="Logo" className="img-size w-50"/>
                    <h1 className="mt-2 text-center">Confirmar tu cuenta</h1>
                    <p className="text-center poppins-font">Estas a un solo paso de poder hacer nuevos amigos. Da click en el boton de abajo para terminar de configurar tu cuenta</p>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <button  onClick={handleClick} className="btn-fill w-50">CONTINUAR</button>
                </div>
            </div>
        </div>
    );
}

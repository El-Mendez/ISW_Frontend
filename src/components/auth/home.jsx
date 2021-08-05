import React from 'react';
import background from '../../assets/background.svg'
import NavBar from "./navbar";

// Diseñar ventana principal que verá el usuario
export default function Home() {
    return (
        <div className="vh-100 vw-100">
            <NavBar/>
            <img src={background} alt="Background" className="start-img"/>
        </div>
    );
}

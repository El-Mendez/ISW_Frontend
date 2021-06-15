import React from 'react';
import background from '../../assets/background.svg'
import NavBar from "./navbar";

export default function Start() {
    return (
        <div className="vh-100 vw-100">
            <NavBar/>
            <img src={background} alt="Background" className="start-img"/>
        </div>
    );
}

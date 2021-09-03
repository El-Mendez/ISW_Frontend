import React, {useState} from 'react';
import img from '../../assets/friends.svg'
import ProfileItem from "./profileItem";

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';


export default function Profile() {

    const [isSelected, setIsSelected] = useState({
        contact: true,
        courses: false,
        hobbies: false
    })

    let svg = createAvatar(style, {
        seed: 'custom-seed',
        // ... and other options
    });

    const handleClick = (e) => {
        setIsSelected({
            [e.target.id]: true,
        });

    }

    const contact = ['test', 'testing', 'ya no recuerdo', 'ahahahah']

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4 d-flex justify-content-center" id="profile-img">
                    <img src="https://avatars.dicebear.com/api/bottts/:seed.svg" alt="Profile" className="w-75 rounded-circle" width="inherit"/>
                </div>
                <div className="col-sm-12 col-md-7 d-flex flex-column align-self-end">
                    <h1>Juanito Perez</h1>
                    <h5>Ingeniería en Ciencias de la computación y tecnología de la información</h5>
                    <h4 className="mt-4">Carné: 123456</h4>
                    <div className="d-flex border-1 border-bottom mt-4">
                        <button onClick={handleClick} id="contact" className={`button-styless mb-2 d-flex align-content-center select-item ${isSelected.contact? 'isSelected': ''}`}>
                            <span className="material-icons"> person </span>
                            Contacto
                        </button>
                        <button onClick={handleClick} id="courses" className={`button-styless ms-3 mb-2 d-flex align-content-center select-item ${isSelected.courses? 'isSelected': ''}`}>
                            <span className="material-icons"> library_books </span>
                            Cursos
                        </button>
                        <button onClick={handleClick} id="hobbies" className={`button-styless ms-3 mb-2 d-flex align-content-center d-md-none select-item ${isSelected.hobbies? isSelected: ''}`}>
                            <span className="material-icons"> book </span>
                            Hobbies
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="d-none d-md-block col-sm-12 col-md-4 d-flex justify-content-center">
                    {/* Aqui van hobbies */}
                    <div className="d-flex w-75 align-content-center">
                        <p className="d-flex align-content-center">
                            <span className="material-icons"> book </span>
                            Hobbies
                        </p>
                        <div className="ms-1 bottom-border"/>
                    </div>

                    <ProfileItem
                        contact={contact}/>
                </div>
                <div className="col-sm-12 col-md-7 d-flex flex-column ms-2">
                    <ProfileItem
                        contact={contact}/>
                </div>
            </div>

        </div>
    );
}

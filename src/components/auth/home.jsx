import React from 'react';
import f1 from '../../assets/1.svg';
import f2 from '../../assets/2.svg';
import f3 from '../../assets/3.svg';
import NavBar from './navbar';

// Diseñar ventana principal que verá el usuario
export default function Home() {
  return (
    <div className="vh-100 vw-100">
      <section className="col">
        <NavBar />
        <div className="first_section" />
      </section>
      

      <div className="h-100 navbar-padding bg-beige" id="test">
        <div className="container-fluid h-100" id="test">
          <div className="row navbar-padding h-100">
            <div className="col-md-12 col-lg-4 align-self-start px-4 py-2">
              <img src={f1} alt="Hobbies" className="w-100" />
              <div className="d-flex flex-column bg-light-white px-2">
                <h1 className="mb-1">Hobbies</h1>
                <h2 className="definition">Actividad que , como afición o pasatiempo favorito , se practica habitualmente en los ratos de ocio.</h2>
                <h2 className="text-end">-RAE</h2>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 align-self-center mb-2 px-4">
              <div className="d-flex flex-column bg-light-white px-2 py-1">
                <h1 className="mb-1">Estudio</h1>
                <h2 className="definition">Trabajo empleado en aprender y cultivar una ciencia o arte.</h2>
                <h2 className="text-end">-RAE</h2>
              </div>
              <img src={f2} alt="Hobbies" className="w-100" />
            </div>
            <div className="col col-xs-10 col-lg-4 align-self-start px-4">
              <img src={f3} alt="Hobbies" className="w-100" />
              <div className="d-flex flex-column bg-light-white px-2 py-1">
                <h1 className="mb-1">Amistad</h1>
                <h2 className="definition">Afecto personal, puro y desinteresado, compartido con otra persona, que nace y se fortalece con el trato</h2>
                <h2 className="text-end">-RAE</h2>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

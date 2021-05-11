import React from 'react';
import { BsPencil } from 'react-icons/bs';
import user from '../../assets/user.png';
import Suggestion from '../suggestions/suggestions';

function HomeView() {
  return (
    <div className="home">
      <div className="suggestions">
        <Suggestion
          nombre="Pepe Gonzales"
          username="Pepe_G52"
          carrera=" Ingeniería Industrial"
          hobbies=" Jugar videojuegos, leer, salir con amigos"
        />
        <Suggestion
          nombre="Juan Perez"
          username="JuanPe52"
          carrera=" Ingeniería en Ciencias de la computación"
          hobbies=" Hacer deporte, jugar videojuegos, escuchar música"
        />
        <Suggestion
          nombre="Laura Lopez"
          username="LauLo"
          carrera=" Ingeniería Industrial"
          hobbies=" Ver series, leer, salir con amigos "
        />
        <Suggestion
          nombre="Andrez Hernandez"
          username="AndrezH"
          carrera=" Ingeniería química"
          hobbies=" Jugar videojuegos, hacer deporte "
        />
        <Suggestion
          nombre="Jose Estrada"
          username="Jose658"
          carrera=" Matemática"
          hobbies=" Leer, jugar videojuegos"
        />
      </div>
    </div>
  );
}

export default HomeView;

import React from 'react';
import Suggestion from '../suggestions/suggestions';
import {  useParams } from 'react-router-dom';

function HomeView() {
  let { hobby } = useParams();
  return (
    <div className="home">
      <div className="suggestions">
        {
          hobby === 'Jugar videojuegos' || hobby === 'Leer' || hobby === 'Salir con amigos' ? (
            <Suggestion
              nombre="Pepe Gonzales"
              username="Pepe_G52"
              carrera=" Ingeniería Industrial"
              hobbies=" Jugar videojuegos, Leer, Salir con amigos"
            />
          ) : ''
        }
        {
          hobby === 'Hacer deporte' || hobby === 'Jugar videojuegos' || hobby === 'Escuchar música' ? (
            <Suggestion
              nombre="Juan Perez"
              username="JuanPe52"
              carrera=" Ingeniería en Ciencias de la computación"
              hobbies=" Hacer deporte, Jugar videojuegos, Escuchar música"
            />
          ) : ''
        }
        {
          hobby === 'Ver series' || hobby === 'Leer' || hobby === 'Salir con amigos' ? (
            <Suggestion
              nombre="Laura Lopez"
              username="LauLo"
              carrera=" Ingeniería Industrial"
              hobbies=" Ver series, Leer, Salir con amigos "
            />
          ) : ''
          }
        {
          hobby === 'Jugar videojuegos' || hobby === 'Hacer deporte' ? (
            <Suggestion
              nombre="Andrez Hernandez"
              username="AndrezH"
              carrera=" Ingeniería química"
              hobbies=" Jugar videojuegos, Hacer deporte "
            />
          ) : ''
            }
        {
            hobby === 'Jugar videojuegos' || hobby === 'Leer' ? (
              <Suggestion
                nombre="Jose Estrada"
                username="Jose658"
                carrera=" Matemática"
                hobbies=" Leer, jugar videojuegos"
              />
            ) : ''
        }
      </div>
    </div>
  );
}

export default HomeView;

import React from 'react';
import { BsPencil } from 'react-icons/bs';
import user from '../../assets/user.png';
import Suggestion from '../suggestions/suggestions';

function HomeView(props) {
  const item = props;
  return (
    <div className="home">
      <div className="suggestions">
        {
          item.hobby === 'Jugar videojuegos' || item.hobby === 'Leer' || item.hobby === 'Salir con amigos' ? (
            <Suggestion
              nombre="Pepe Gonzales"
              username="Pepe_G52"
              carrera=" Ingeniería Industrial"
              hobbies=" Jugar videojuegos, Leer, Salir con amigos"
            />
          ) : ''
        }
        {
          item.hobby === 'Hacer deporte' || item.hobby === 'Jugar videojuegos' || item.hobby === 'Escuchar música' ? (
            <Suggestion
              nombre="Juan Perez"
              username="JuanPe52"
              carrera=" Ingeniería en Ciencias de la computación"
              hobbies=" Hacer deporte, Jugar videojuegos, Escuchar música"
            />
          ) : ''
        }
        {
          item.hobby === 'Ver series' || item.hobby === 'Leer' || item.hobby === 'Salir con amigos' ? (
            <Suggestion
              nombre="Laura Lopez"
              username="LauLo"
              carrera=" Ingeniería Industrial"
              hobbies=" Ver series, Leer, Salir con amigos "
            />
          ) : ''
          }
        {
          item.hobby === 'Jugar videojuegos' || item.hobby === 'Hacer deporte' ? (
            <Suggestion
              nombre="Andrez Hernandez"
              username="AndrezH"
              carrera=" Ingeniería química"
              hobbies=" Jugar videojuegos, Hacer deporte "
            />
          ) : ''
            }
        {
            item.hobby === 'Jugar videojuegos' || item.hobby === 'Leer' ? (
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

import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import Navbar from '../navbar/navbar';
import HomeView from '../homeView/homeView';
import Search from '../search/search';
import Perfil from '../perfil/perfil';
import Suggestion from '../suggestions/suggestions';

function Home() {
  const { url } = useRouteMatch();
  const valor = null;
  const [data, setData] = useState({
    hobby: 'Test',
  });

  const updateData = (hobby) => {
    console.log('Test');
    setData({
      hobby: hobby,
    })
  }

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={`${url}/recomendaciones/:hobby`}>
          <HomeView />
        </Route>
        <Route path={`${url}/search`}>
          <Search
            setHobby={(hobby) => updateData(hobby)}
            hobby={data.hobby}
          />
        </Route>
        <Route path={`${url}/profile`}>
          <Perfil
            nombres="Pablo Andres"
            apellidos="Gonzales Estrada"
            userName="Pablo_AGE"
            carrera="Ingeniería Industrial"
            hobbies="Escuchar música, Jugar videojuegos, Leer, Hacer deporte, Salir con amigos"
            descripcion="Hola! Me llamo Pablo. Me gusta que me llamen por mi primer nombre y no por el segundo. Estudio Ingeniería Industrial. Tengo 19 años. Vivo con mis padres y mi hermano pequeño. Tengo varios hobbies, pero sin duda algúna, mi favorito es hacer deporte. Me gusta mucho jugar futbol.
            Redes sociales"
            facebook="Pablo586"
            twitter="@PabloAge"
            instagram={valor}
          />
        </Route>
        <Route path={`${url}`}>
          {/* Aqui se pasara los datos del usuario de la base de datos */}
          <Suggestion
            nombre="Laura Lopez"
            username="LauLo"
            carrera=" Ingeniería Industrial"
            hobbies=" Ver series, Leer, Salir con amigos "
          />
          <Suggestion
            nombre="Juan Perez"
            username="JuanPe52"
            carrera=" Ingeniería Industrial"
            hobbies=" Hacer deporte, Jugar videojuegos, Escuchar música"
          />
          <Suggestion
            nombre="Pepe Gonzales"
            username="Pepe_G52"
            carrera=" Ingeniería Industrial"
            hobbies=" Jugar videojuegos, Leer, Salir con amigos"
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;

import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import Navbar from '../navbar/navbar';
import Perfil from '../perfil/perfil';
import HomeView from '../homeView/homeView';
import Search from '../search/search';

function Home() {
  const { url } = useRouteMatch();
  const [hobby, setHobby] = useState("");
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={`${url}/recomendaciones`}>
          <HomeView
            hobby={hobby}
            setHobby={setHobby}
          />
        </Route>
        <Route path={url}>
          <Search
            hobby={hobby}
            setHobby={setHobby}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;

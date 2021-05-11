import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import Navbar from '../navbar/navbar';
import Perfil from '../perfil/perfil';
import HomeView from '../homeView/homeView';

function Home() {
  const { url } = useRouteMatch();
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={`${url}`}>
          <HomeView />
        </Route>
        <Route path={`${url}/perfil`}>
          <Perfil />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;

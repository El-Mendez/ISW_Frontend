import React from 'react';
import NavBar from "../navbar/navbar";
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import Search from '../search/search';

function Dashboard() {
  const { url } = useRouteMatch();
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route path={`${url}/search`}>
          <Search/>
        </Route>
      </Switch>
    </div>

  );
}

export default Dashboard;

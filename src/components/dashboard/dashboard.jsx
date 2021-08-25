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
        <Route path={`${url}/search/courses`}>
          <Search
          type = {0}
          />
        </Route>
        <Route path={`${url}/search/hobbies`}>
          <Search
          type = {1}
          />
        </Route>
      </Switch>
    </div>

  );
}

export default Dashboard;

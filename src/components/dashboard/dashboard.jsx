import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import NavBar from '../navbar/navbar';
import Search from '../search/search';
import UserInfo from '../profile/profile';

function Dashboard() {
  const { url } = useRouteMatch();
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path={`${url}/search/hobbies/profile/:carne`}>
          <UserInfo />
        </Route>
        <Route path={`${url}/search/courses/profile/:carne`}>
          <UserInfo />
        </Route>
        <Route path={`${url}/search/courses`}>
          <Search
            type={0}
          />
        </Route>
        <Route path={`${url}/search/hobbies`}>
          <Search
            type={1}
          />
        </Route>

      </Switch>
    </div>

  );
}

export default Dashboard;

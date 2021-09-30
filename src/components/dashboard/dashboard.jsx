import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import NavBar from '../navbar/navbar';
import Search from '../search/search';
import UserInfo from '../profile/profile';
import DashContent from './dashcontent';
import FriendsList from '../friends/friends';

function Dashboard() {
  const { url } = useRouteMatch();
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={`${url}`}>
          <DashContent />
        </Route>
        <Route exact path={`${url}/friends`}>
          <FriendsList />
        </Route>
        <Route path={`${url}/profile`}>
          <UserInfo
            type={0}
          />
        </Route>
        <Route path={`${url}/search/courses/profile/:carne`}>
          <UserInfo
            type={1}
          />
        </Route>
        <Route path={`${url}/search/hobbies/profile/:carne`}>
          <UserInfo
            type={1}
          />
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

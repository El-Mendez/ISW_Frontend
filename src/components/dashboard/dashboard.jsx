import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import NavBar from '../navbar/navbar';
import Suggetions from '../suggestions/suggetions';
import UserInfo from '../profile/profile';
import DashContent from './dashcontent';
import FriendsList from '../friends/friends';
import Request from '../friends/request';
import FriendsNotifications from '../friends/friendsNotifications';
import Search from '../search/search';

function Dashboard() {
  const { url } = useRouteMatch();
  return (
    <div>
      <NavBar />
      <FriendsNotifications />
      <Switch>
        <Route exact path={`${url}`} component={DashContent} />
        {/*  Búsqueda de usuarios por hobbies o cursos específicos */}
        <Route exact path={`${url}/search`} component={Search} />
        <Route exact path={`${url}/friends`} component={FriendsList} />
        <Route exact path={`${url}/get_request`}>
          <Request
            type={0}
          />
        </Route>
        <Route exact path={`${url}/sent_request`}>
          <Request
            type={1}
          />
        </Route>
        {/* VER PERFIL DE USUARIO */}
        <Route exact path={`${url}/get_request/profile/:carne`}>
          <UserInfo
            type={1}
            friend={0}
          />
        </Route>
        <Route exact path={`${url}/sent_request/profile/:carne`}>
          <UserInfo
            type={1}
            friend={0}
          />
        </Route>
        <Route exact path={`${url}/friends/profile/:carne`}>
          <UserInfo
            type={2}
            friend={1}
          />
        </Route>
        {/* No recuerdo que era este link */}
        <Route path={`${url}/profile/:carne`}>
          <UserInfo
            type={1}
          />
        </Route>
        <Route exact path={`${url}/profile`}>
          <UserInfo
            type={0}
            friend={1}
          />
        </Route>
        {/* Redireccionamiento al perfil de los usuarios desde búsqueda y recomendaciones */}
        <Route path={`${url}/search/profile/:carne`}>
          <UserInfo
            type={1}
            friend={0}
          />
        </Route>
        <Route path={`${url}/search/courses/profile/:carne`}>
          <UserInfo
            type={1}
            friend={0}
          />
        </Route>
        <Route path={`${url}/search/hobbies/profile/:carne`}>
          <UserInfo
            type={1}
            friend={0}
          />
        </Route>
        {/* RECOMENDACIONES */}
        <Route path={`${url}/search/courses`}>
          <Suggetions
            type={0}
          />
        </Route>
        <Route path={`${url}/search/hobbies`}>
          <Suggetions
            type={1}
          />
        </Route>
        <Route path={`${url}/search/friends`}>
          <Suggetions
            type={2}
          />
        </Route>
      </Switch>
    </div>

  );
}

export default Dashboard;

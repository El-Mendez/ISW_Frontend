import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './login/login';
import Start from './start/start';
import SignUp from './register/register';
import Custom404 from './404/custom_404';
import Home from './home/home';
import UserData from './data/data';

export default function MainRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/404" component={Custom404} />
        <Route path="/home" component={Home} />
        <Route path="/data" component={UserData} />
        <Route path="/perfil" component={UserData} />
      </Switch>
    </Router>
  );
}

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './start/start';
import Custom404 from './404/custom_404';
import Home from './home/home';
import PersonalForm from "./data/personalForm";

export default function MainRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/404" component={Custom404} />
        <Route path="/home" component={Home} />
        <Route path="/data" component={PersonalForm} />
        <Route path="/perfil" component={PersonalForm} />
      </Switch>
    </Router>
  );
}

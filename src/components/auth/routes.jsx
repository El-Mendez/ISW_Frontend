import React from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./navbar";
import Register from "./register/register"

export default function Routes() {
  return (
      <>
        <NavBar/>
        <Switch>
          <Route path="/signUp" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </>
  );
}

import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PersonalForm from './personalForm';
import AcademicForm from './academicForm';
import ContactForm from './contactForm';

function UserData() {

  let {path} = useRouteMatch();

  return (
    <div >
        <Switch>
          <Route path={`${path}/contact/academic`}>
            <AcademicForm/>
          </Route>
          <Route path={`${path}/contact`}>
            <ContactForm/>
          </Route>
          <Route path={path}>
            <PersonalForm/>
          </Route>
        </Switch>
    </div>
  );
}

export default UserData;

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import Start from './auth/home';
import Custom404 from './404/custom_404';
import UserInfo from './register/userInfo';
import { AUTH } from './utils/rutas';
import ProtectedRoutes from './protectedRoutes';
import Register from './register/register';
import Dashboard from './dashboard/dashboard';
import ForgotPassword from './resetPassword/forgotPassword';
import ResetPassword from './resetPassword/resetpassword';
import ConfirmAccount from './register/confirmAccount';
import RegisterAccountMessage from './register/registerAccountMessage';
import Profile from './profile/profile';
import CardRequest from './utils/cardRequest';

export default function MainRoutes() {
  const cookies = new Cookies();
  const token = cookies.get('session');
  const [session, setSession] = useState(false);

  function persistenSession() {
    const request = async () => {
      try {
        await Axios.get(AUTH,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setSession(true);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }

  useEffect(() => {
    persistenSession();
  }, [token]);
  return (
    <Router>
      <Switch>
        <ProtectedRoutes path="/home" session={session} component={Dashboard} />
        <Route
          exact
          path="/"
          render={() => (!session
            ? (
              <Start />
            )
            : (
              <Redirect to={
                       {
                         pathname: '/home',
                       }
                   }
              />
            ))}
        />
        <Route path="/data" session={session} component={UserInfo} />
        <Route exact path="/signUp" component={Register} />
        <Route path="/recovery" component={ResetPassword} />
        <Route exact path="/reset-password" component={ForgotPassword} />
        <Route exact path="/confirm" component={ConfirmAccount} />
        <Route exact path="/test" component={CardRequest} />
        {/* Handle every other path that is not define */}
        <Route path="*" component={Custom404} />
      </Switch>
    </Router>
  );
}

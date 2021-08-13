import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './auth/home';
import Custom404 from './404/custom_404';
import UserInfo from "./data/userInfo";
import Cookies from 'universal-cookie';
import Axios from "axios";
import { AUTH } from './utils/rutas'
import Register from "./auth/register/register";
import Dashboard from "./dashboard/dashboard";


export default function MainRoutes() {

    const cookies = new Cookies();
    const token = cookies.get('session')
    const [session, setSession] = useState(false);

    function persistenSession(){
        const request = async () => {
            try {
                const res = await Axios.get(AUTH,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSession(true);
            } catch (error) {
                console.log(error);
            }
        };
        request();
    };

    useEffect(()=>{
        persistenSession()
    }, [])
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
            {session
                ? <Dashboard/>
                : <Start/>
            }
        </Route>
        {/*<Route exact path="/" component={Start} />*/}
        <Route exact path="/signUp" component={Register} />
        <Route path="/404" component={Custom404} />
        <Route path="/home" component={Dashboard} />
        <Route path="/data" component={UserInfo} />
        <Route path="/perfil" component={UserInfo} />
      </Switch>
    </Router>
  );
}

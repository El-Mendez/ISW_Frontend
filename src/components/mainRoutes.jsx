import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './auth/routes';
import Custom404 from './404/custom_404';
import Home from './home/home';
import PersonalForm from "./data/personalForm";
import Cookies from 'universal-cookie';
import Axios from "axios";


export default function MainRoutes() {
    const get_auth = 'http://api.meetinguvg.me/auth/ping';

    const cookies = new Cookies();
    const token = cookies.get('session')
    const [session, setSession] = useState(false);

    function persistenSession(){
        console.log("Loading...");
        const request = async () => {
            try {
                const res = await Axios.get(get_auth,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSession(true);
                console.log(res)
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
                ? <Home/>
                : <Routes/>
            }
        </Route>
        {/*<Route exact path="/" component={Start} />*/}
        <Route path="/404" component={Custom404} />
        <Route path="/home" component={Home} />
        <Route path="/data" component={PersonalForm} />
        <Route path="/perfil" component={PersonalForm} />
      </Switch>
    </Router>
  );
}

import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import Navbar from '../navbar/navbar';
import HomeView from '../homeView/homeView';
import Search from '../search/search';


function Home() {
  const { url } = useRouteMatch();

  const [data, setData] = useState({
    hobby: 'Test',
  });

  const updateData = (hobby) => {
    console.log('Test');
    setData({
      hobby: hobby,
    })
  }

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={`${url}/recomendaciones/:hobby`}>
          <HomeView />
        </Route>
        <Route path={url}>
          <Search
            setHobby={(hobby) => updateData(hobby)}
            hobby = {data.hobby}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
// import NotFound from '../elements/NotFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:movieId" component={Movie} exact />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

function App() {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/movies">
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/">
          <Main />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../../utils/MainApi.js';

import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Preloader from '../Preloader/Preloader.js';
import Menu from '../Menu/Menu.js';
import InfoTooltip from '../InfoToolTip/InfoTooltip.js';

function App() {

  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [tooltip, setTooltip] = React.useState({error: "номер ошибки", text: "текст ошибки"});

  function handleOpenMenu() {
    setIsMenuVisible(true);
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  function closeTooltip() {
    setIsTooltipOpen(false);
  }

  //Обработчик сабмита формы регистрации
  function handleRegisterSubmit(data) {
    const {name, email, password} = data;
    api.registerUser(name, email, password)
      .then((res) => {
        console.log("результат:");
        console.log(res);
        if (res.data) {
          setTimeout(() => {
            setLoggedIn(true);
            history.push("/movies");
          }, 1000);
        }
        else {
          setTooltip({error: res.statusCode, text: res.message})
          setIsTooltipOpen(true);
        }
      })
      .catch((err) => {
        //console.log(err);
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })
  }

  //Обработчик сабмита формы входа
  function handleLoginSubmit(data) {
    const {email, password} = data;
    api.loginUser(email, password)
      .then((res) => {
        console.log("результат:");
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          //setEmail(email);
          setTimeout(() => {
            setLoggedIn(true);
            history.push("/movies");
          }, 1000);
        }
        else {
          setTooltip({error: res.statusCode, text: res.message})
          setIsTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })  
  }





  return (
    <div className="page">
      <InfoTooltip isOpen={isTooltipOpen} onClose={closeTooltip} title={tooltip.error} subtitle={tooltip.text} />
      <Header onOpenMenu={handleOpenMenu} />
      <Menu isOpen ={isMenuVisible} onClose={handleCloseMenu} />
      <Switch>
        <Route path="/signup">
          <Register onSubmit={handleRegisterSubmit} />
        </Route>
        <Route path="/signin">
          <Login onSubmit={handleLoginSubmit}/>
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

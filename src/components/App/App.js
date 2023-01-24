import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../../utils/MainApi.js';
import apiMovies from '../../utils/MoviesApi.js';
import CurrentUserContext from '../../context/CurrentUserContext';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

function App() {

  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({name: "", email: ""});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [tooltip, setTooltip] = React.useState({error: "номер ошибки", text: "текст ошибки"});

  const [isShort, setIsShort] = React.useState(false);
  const [isShortSaved, setIsShortSaved] = React.useState(false);

  const [moviesList, setMoviesList] = React.useState([]);

  
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserByToken(localStorage.getItem('token'))
      .then((res) => {
        const {_id, name, email} = res.data;
        setCurrentUser({name, email});
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn])
  
  React.useEffect(() => {
    checkToken();
  }, [])

  function checkToken() {
    if (localStorage.getItem('token')) {
      api.getUserByToken(localStorage.getItem('token'))
        .then(res => {
          if (res.data) {
            const {_id, name, email} = res.data;
            setLoggedIn(true);
            setCurrentUser({name, email});
            history.push("/movies");
          }
          else {
            history.push("/signin");
          }
        })
        .catch((err) => {
          err.then((data) => {
            console.log(data);
          })
        })  
    }
  }

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

  //Обработчик сабмита формы входа
  function handleProfileSubmit(data) {
    const {name, email} = data;
    api.setUserInfo(name, email)
      .then((res) => {
        console.log("результат:");
        console.log(res);
        if (res.data) {
          setCurrentUser({name, email});
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

  //Обработчик выхода из аккаунта
  function handleExitSubmit() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push("/signin");
  }

  //Обработчик сабмита формы поиска фильмов
  function handleFilmSubmit(data) {
    const {filter} = data;
    //console.log(film)
    if (filter === "") {
      setTooltip({error: "", text: "Нужно ввести ключевое слово"})
      setIsTooltipOpen(true);
    }
    else {
      apiMovies.getFilms()
      .then((res)=> {
        localStorage.setItem("films", JSON.stringify(res));
        localStorage.setItem("filter", JSON.stringify(filter));
        localStorage.setItem("isShort", JSON.stringify(isShort));
        setMoviesList(res);
      })
      .catch((err) => {
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })
    }
  }

  function handleFilmSwitch(isChecked) {
    localStorage.setItem("isShort", JSON.stringify(isChecked));
    setIsShort(isChecked);
  }
  
  function handleFilmSavedSwitch(isChecked) {
    localStorage.setItem("isShortSaved", JSON.stringify(isChecked));
    setIsShortSaved(isChecked);
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <InfoTooltip isOpen={isTooltipOpen} onClose={closeTooltip} title={tooltip.error} subtitle={tooltip.text} />
      <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
      <Menu isOpen ={isMenuVisible} onClose={handleCloseMenu} />
      <Switch>
        <Route path="/signup">
          <Register onSubmit={handleRegisterSubmit} />
        </Route>
        <Route path="/signin">
          <Login onSubmit={handleLoginSubmit}/>
        </Route>
        <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onSubmit={handleProfileSubmit}
            onExit={handleExitSubmit}
        />
        <Route path="/movies">
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onSubmit={handleFilmSubmit}
            onSwitch={handleFilmSwitch}
            isShort={isShort}
            moviesList={moviesList}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            //onSubmit={handleFilmSavedSubmit}
            onSwitch={handleFilmSavedSwitch}
            isShort={isShortSaved}
          />
          <Footer />
        </Route>
        <Route path="/">
          <Main />
          <Footer />
        </Route>
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

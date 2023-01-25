import React from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
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
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

function App() {

  const history = useHistory();
  const location = useLocation().pathname;

  const [currentUser, setCurrentUser] = React.useState({name: "", email: ""});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [tooltip, setTooltip] = React.useState({error: "номер ошибки", text: "текст ошибки"});

  const [isShort, setIsShort] = React.useState(false);
  const [isShortSaved, setIsShortSaved] = React.useState(false);

  const [moviesList, setMoviesList] = React.useState([]);
  const [moviesSavedList, setMoviesSavedList] = React.useState([]);

  
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

  //Функция проверки токена пользователя
  function checkToken() {
    if (localStorage.getItem('token')) {
      api.getUserByToken(localStorage.getItem('token'))
        .then(res => {
          if (res.data) {
            const {_id, name, email} = res.data;
            setLoggedIn(true);
            setCurrentUser({name, email});
            switch (location) {
              case "/signin":
                history.push("/movies");
                break;
              case "/signup":
                history.push("/movies");
                break;
              default:
                history.push(location);
            }
            //history.push("/movies");
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
    localStorage.removeItem('filter');
    localStorage.removeItem('isShort');
    localStorage.removeItem('films');
    setLoggedIn(false);
    history.push("/signin");
  }

  //Обработчик сабмита формы поиска фильмов
  function handleFilmSubmit(data) {
    const {filter} = data;
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

  //Обработчик сабмита формы поиска сохраненных фильмов
  function handleFilmSavedSubmit(data) {
    const {filter} = data;
    //console.log(film)
    if (filter === "") {
      setTooltip({error: "", text: "Нужно ввести ключевое слово"})
      setIsTooltipOpen(true);
    }
    else {
      apiMovies.getFilms()
      .then((res)=> {
        localStorage.setItem("filmsSaved", JSON.stringify(res));
        localStorage.setItem("filterSaved", JSON.stringify(filter));
        localStorage.setItem("isShortSaved", JSON.stringify(isShortSaved));
        setMoviesSavedList(res);
      })
      .catch((err) => {
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })
    }
  }

  //Обработчик нажатия чекбокса фильмов
  function handleFilmSwitch(isChecked) {
    localStorage.setItem("isShort", JSON.stringify(isChecked));
    setIsShort(isChecked);
  }
  
  //Обработчик нажатия чекбокса сохраненных фильмов
  function handleFilmSavedSwitch(isChecked) {
    localStorage.setItem("isShortSaved", JSON.stringify(isChecked));
    setIsShortSaved(isChecked);
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">      
      <InfoTooltip isOpen={isTooltipOpen} onClose={closeTooltip} title={tooltip.error} subtitle={tooltip.text} />
      
      <Menu isOpen ={isMenuVisible} onClose={handleCloseMenu} />
      <Switch>
        <Route exact path="/">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <Register onSubmit={handleRegisterSubmit} />
        </Route>
        <Route path="/signin">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <Login onSubmit={handleLoginSubmit}/>
        </Route>
        <Route path="/profile">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSubmit={handleProfileSubmit}
              onExit={handleExitSubmit}
          />
        </Route>
        <Route path="/movies">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onSubmit={handleFilmSubmit}
            onSwitch={handleFilmSwitch}
            isShort={isShort}
            //moviesList={moviesList}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            onSubmit={handleFilmSavedSubmit}
            onSwitch={handleFilmSavedSwitch}
            isShort={isShortSaved}
            moviesList={moviesSavedList}
          />
          <Footer />
        </Route>
        <Route path="/404">
            <NotFoundPage />
        </Route>
        <Route path="*">
          <Redirect to="/404" />
        </Route>  
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

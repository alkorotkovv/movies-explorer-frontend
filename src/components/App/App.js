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

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccesful, setIsSuccesful] = React.useState(false);


  
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
    else {
      history.push("/");
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
          }
          else {
            history.push("/");
          }
        })
        .catch((err) => {
          err.then((data) => {
            console.log(data);
          })
        })  
    }
  }

  //Обработчик открытия меню
  function handleOpenMenu() {
    setIsMenuVisible(true);
  }

  //Обработчик закрытия меню
  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  //Закрытие всплывающего окна
  function closeTooltip() {
    setIsTooltipOpen(false);
  }

  //Обработчик сабмита формы регистрации
  function handleRegisterSubmit(data) {
    const {name, email, password} = data;
    api.registerUser(name, email, password)
      .then((res) => {
        if (res.data) {
          handleLoginSubmit(data);
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
        if (res.token) {
          localStorage.setItem('token', res.token);
          //Подгружаем сохраненные фильмы в локалсторейдж
          handleFilmSavedSubmit({filter: ""});
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
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })  
  }

  //Обработчик сабмита формы редактирования профиля
  function handleProfileSubmit(data) {
    const {name, email} = data;
    api.setUserInfo(name, email)
      .then((res) => {
        if (res.data) {
          setCurrentUser({name, email});
          setIsSuccesful(true);
          setTimeout(() => {
            setIsSuccesful(false);
          }, 2000)
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
    localStorage.removeItem('filterSaved');
    localStorage.removeItem('isShortSaved');
    localStorage.removeItem('filmsSaved');
    setLoggedIn(false);
    //history.push("/");
  }

  //Обработчик сабмита формы поиска фильмов
  function handleFilmSubmit(data) {
    const {filter} = data;
    if (filter === "") {
      setTooltip({error: "", text: "Нужно ввести ключевое слово"})
      setIsTooltipOpen(true);
    }
    else {
      setIsLoading(true);
      apiMovies.getFilms()
      .then((res)=> {
        localStorage.setItem("films", JSON.stringify(res));
        localStorage.setItem("filter", JSON.stringify(filter));
        localStorage.setItem("isShort", JSON.stringify(isShort));
        //setMoviesList(res);
        setIsLoading(false);
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
    setIsLoading(true);
    api.getSavedMovies()
    .then((res)=> {
      localStorage.setItem("filmsSaved", JSON.stringify(res.data));
      localStorage.setItem("filterSaved", JSON.stringify(filter));
      localStorage.setItem("isShortSaved", JSON.stringify(isShortSaved));
      setMoviesSavedList(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      setTooltip({error: err.statusCode, text: err.message})
      setIsTooltipOpen(true);
    })
  }

  //Обработчик нажатия чекбокса фильмов
  function handleFilmSwitch(isChecked) {
    localStorage.setItem("isShort", JSON.stringify(isChecked || false));
    setIsShort(isChecked);
  }
  
  //Обработчик нажатия чекбокса сохраненных фильмов
  function handleFilmSavedSwitch(isChecked) {
    localStorage.setItem("isShortSaved", JSON.stringify(isChecked || false));
    setIsShortSaved(isChecked);
  }
  
  //Обработчик нажатия лайка
  function handleLikeFilm(data) {
    api.saveMovie(data)
      .then((res)=> {
        const newMoviesSavedList = moviesSavedList.slice()
        newMoviesSavedList.push(res.data);
        setMoviesSavedList(newMoviesSavedList);
        localStorage.setItem("filmsSaved", JSON.stringify(newMoviesSavedList));
        //getSavedFilms()
      })
      .catch((err) => {
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })
  }

  //Обработчик нажатия дизлайка
  function handleUnlikeFilm(data) {
    api.deleteMovie(data._id)
      .then((res)=> {
        const newMoviesSavedList = JSON.parse(localStorage.getItem("filmsSaved")).filter((item) => (item._id !== data._id)) || [];
        setMoviesSavedList(newMoviesSavedList);
        localStorage.setItem("filmsSaved", JSON.stringify(newMoviesSavedList));
        //getSavedFilms()
      })
      .catch((err) => {
        setTooltip({error: err.statusCode, text: err.message})
        setIsTooltipOpen(true);
      })
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
              isSuccesful={isSuccesful}
              component={Profile}
              onSubmit={handleProfileSubmit}
              onExit={handleExitSubmit}
          />
        </Route>
        <Route path="/movies">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <ProtectedRoute
            path="/movies"            
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            isShort={isShort}
            
            onSubmit={handleFilmSubmit}
            onSwitch={handleFilmSwitch}            
            onLike={handleLikeFilm}
            onUnlike={handleUnlikeFilm}            
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header onOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            isShort={isShortSaved}
            moviesSavedList={moviesSavedList}
            onSubmit={handleFilmSavedSubmit}
            onSwitch={handleFilmSavedSwitch}
            onLike={handleLikeFilm}
            onUnlike={handleUnlikeFilm}            
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

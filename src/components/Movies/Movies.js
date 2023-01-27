import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {

  const [filter, setFilter] = React.useState(getFilter());
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(() => {
    console.log("Movies")
    console.log(props)
    setFilter(getFilter());
    setMovies(getMoviesList(filter));
    setSavedMovies(getSavedMoviesList(filter));
  },[])

  React.useEffect(() => {
    console.log("Movies")
    console.log(props)
    setFilter(getFilter());
    setMovies(getMoviesList(filter));
    setSavedMovies(getSavedMoviesList(filter));
  },[props, filter])

  //Функция получения фильтра из localstorage
  function getFilter() {
    let filter = JSON.parse(localStorage.getItem("filter")) || "";
    return filter;
  }
  
  //Функция получения фильмов для отрисовки (уже отсортированных)
  function getMoviesList(filter) {
    const movies = JSON.parse(localStorage.getItem("films")) || [];
    const filterFilms = movies.filter(element => element.nameRU.toUpperCase().includes(filter.toUpperCase()));
    return filterFilms;
  }

  //Функция получения сохраненных фильмов из localstorage
  function getSavedMoviesList(filter) { 
    const movies = JSON.parse(localStorage.getItem("filmsSaved")) || [];
    const filterFilms = movies.filter(element => element.nameRU.includes(filter));
    return filterFilms;
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={props.onSwitch} filter={filter} />
      <Preloader isVisible={props.isLoading} />
        <MoviesCardList 
          cards={movies} 
          filter={filter}
          isShort={props.isShort} 
          onLike={props.onLike} 
          onUnlike={props.onUnlike}
          //getSavedFilms={props.getSavedFilms} 
          moviesSavedList={savedMovies} />
    </main>
  );
  
}

export default Movies;

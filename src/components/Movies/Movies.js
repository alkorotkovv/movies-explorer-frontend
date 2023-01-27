import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {

  console.log("movies")

  React.useEffect(() => {
    getFilter();
    getMoviesList();
    getSavedMoviesList();
  }, [])

  const filter = getFilter()
  const movies = getMoviesList(filter)
  const savedMovies = getSavedMoviesList(filter)
   
  //Функция получения фильмов для отрисовки (уже отсортированных)
  function getMoviesList(filter) {    
    const movies = JSON.parse(localStorage.getItem("films")) || [];
    const filterFilms = movies.filter(element => element.nameRU.includes(filter));
    return filterFilms;
  }

  //Функция получения фильтра из локалсторейджа
  function getFilter() {
    let filter = JSON.parse(localStorage.getItem("filter")) || "";
    return filter;
  }

  function getSavedMoviesList(filter) {    
    const movies = JSON.parse(localStorage.getItem("filmsSaved")) || [];
    const filterFilms = movies.filter(element => element.nameRU.includes(filter));
    return filterFilms;
  }
  
  

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={props.onSwitch} filter={filter} />
      <MoviesCardList 
        cards={movies} 
        isShort={props.isShort} 
        onLike={props.onLike} 
        onUnlike={props.onUnlike}
        //getSavedFilms={props.getSavedFilms} 
        moviesSavedList={savedMovies} />
    </main>
  );
}

export default Movies;

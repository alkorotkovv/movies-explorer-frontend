import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {

  React.useEffect(() => {
    getFilter();
    getMoviesList();
  }, [])

  const filter = getFilter()
  const movies = getMoviesList(filter)
   
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
  
  

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={props.onSwitch} filter={filter} />
      <MoviesCardList cards={movies} isShort={props.isShort} onLike={props.onLike} getSavedFilms={props.getSavedFilms} moviesSavedList={props.moviesSavedList} />
    </main>
  );
}

export default Movies;

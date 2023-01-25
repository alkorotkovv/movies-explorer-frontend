import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies(props) {

  React.useEffect(() => {
    getFilter();
    getMoviesList();
  }, [])

  const filter = getFilter()
  const movies = getMoviesList(filter)
   
  //Функция получения фильмов для отрисовки (уже отсортированных)
  function getMoviesList(filter) {    
    const movies = JSON.parse(localStorage.getItem("filmsSaved")) || [];
    const filterFilms = movies.filter(element => element.nameRU.includes(filter));
    return filterFilms;
  }

  //Функция получения фильтра из локалсторейджа
  function getFilter() {
    let filter = JSON.parse(localStorage.getItem("filterSaved")) || "";
    return filter;
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={props.onSwitch} filter={filter} />
      <MoviesCardList cards={movies} isShort={props.isShort} onLike={props.onLike} />
    </main>
  );
}

export default SavedMovies;

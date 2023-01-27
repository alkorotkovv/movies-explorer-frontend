import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

const SavedMoviess = React.memo((props) => {

  console.log(props)

  const filter = getFilter()
  const movies = getSavedMoviesList(filter)
  
  React.useEffect(() => {
    props.onSubmit({filter: ""});
  }, [])
   
  //Функция получения фильмов для отрисовки (уже отсортированных)
  function getSavedMoviesList(filter) {        
    const movies = JSON.parse(localStorage.getItem("filmsSaved")) || [];
    const filterFilms = movies.filter(element => element.nameRU.toUpperCase().includes(filter.toUpperCase()));
    return filterFilms;
  }

  //Функция получения фильтра из localstorage
  function getFilter() {
    let filter = JSON.parse(localStorage.getItem("filterSaved")) || "";
    return filter;
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
        moviesSavedList={props.moviesSavedList} />
    </main>
  );
}
)

export default SavedMoviess;

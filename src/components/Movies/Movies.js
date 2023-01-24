import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {

  //console.log("propsMovies");
  //console.log(props.moviesList);
  
    
  let moviesList;
  if (localStorage.getItem("films")) {
    moviesList = JSON.parse(localStorage.getItem("films"))
  }
  else {
    moviesList = [];
  }
  

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={props.onSwitch}/>
      <MoviesCardList cards={moviesList} isShort={props.isShort} />
    </main>
  );
}

export default Movies;

import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {

  //console.log("propsMovies");
  //console.log(props);

  const [isShort, setIsShort] = React.useState(false);
  
  let moviesList;
  if (localStorage.getItem("films")) {
    moviesList = JSON.parse(localStorage.getItem("films"))
  }
  else {
    moviesList = [];
  }
  


  function handleSwitch(isChecked) {
    setIsShort(isChecked);
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={handleSwitch}/>
      <MoviesCardList cards={moviesList} isShort={isShort} />
    </main>
  );
}

export default Movies;

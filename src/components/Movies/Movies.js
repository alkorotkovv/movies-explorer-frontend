import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {

  const [isShort, setIsShort] = React.useState(false);

  function handleSwitch(isChecked) {
    setIsShort(isChecked);
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={handleSwitch}/>
      <MoviesCardList cards={props.cards} isShort={isShort} />
    </main>
  );
}

export default Movies;

import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit}/>
      <MoviesCardList cards={props.cards}/>
    </main>
  );
}

export default Movies;

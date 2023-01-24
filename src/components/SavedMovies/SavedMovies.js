import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies(props) {

  let moviesList;
  if (localStorage.getItem("films_saved")) {
    moviesList = JSON.parse(localStorage.getItem("films_saved"))
  }
  else {
    moviesList = [];
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={props.onSubmit} onSwitch={props.onSwitch} />
      <MoviesCardList cards={moviesList} isShort={props.isShort} />
    </main>
  );
}

export default SavedMovies;

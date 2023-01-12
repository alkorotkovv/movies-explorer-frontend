import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={[1,2,3,4]} />
    </main>
  );
}

export default SavedMovies;

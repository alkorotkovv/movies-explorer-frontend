import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={[1,2,3,4,5,6,7,8,9,10,11,12]}/>
    </main>
  );
}

export default Movies;

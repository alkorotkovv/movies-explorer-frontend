import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <>
    <ul className="card-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </ul>
    <button class="card-list__button-more">Ещё</button>
    </>
  );
}

export default MoviesCardList;

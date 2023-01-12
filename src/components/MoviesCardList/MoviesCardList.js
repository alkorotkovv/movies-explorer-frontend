import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <>
    <ul className="card-list">
      { 
        props.cards.map(element => 
          <MoviesCard isLiked={false}/>
        )
      }
    </ul>
    <button class="card-list__button-more">Ещё</button>
    </>
  );
}

export default MoviesCardList;

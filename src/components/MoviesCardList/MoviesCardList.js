import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <>
    <ul className="card-list">
      { 
        props.cards.map((element, index) => 
          <MoviesCard key={index} isLiked={false}/>
        )
      }
    </ul>
    <button className="movies__button-more" type="submit" >Ещё</button>
    </>
  );
}

export default MoviesCardList;

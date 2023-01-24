import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  //console.log(props);

  return (
    <>
    <ul className="card-list">
      { 
        props.cards.map((element, index) => 
          <MoviesCard 
            key={element.id} 
            country = {element.country}
            created_at = {element.created_at}
            description = {element.description}
            director = {element.director}
            duration = {element.duration}
            image = {element.image}
            nameEN = {element.nameEN}
            nameRU = {element.nameRU}
            trailerLink = {element.trailerLink}
            updated_at = {element.updated_at}
            year = {element.year}
            isLiked={false}
          />
        )
      }
    </ul>
    <button className="movies__button-more" type="submit" >Ещё</button>
    </>
  );
}

export default MoviesCardList;

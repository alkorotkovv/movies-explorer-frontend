import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  

  let block;

  if (!props.isShort) {
    block = 
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
  else {
    block = 
      props.cards.filter(element => element.duration < 40).map((element, index) =>
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

  return (
    <>
    <ul className="card-list">
      { 
        block
      }
    </ul>
    <button className="movies__button-more" type="submit" >Ещё</button>
    </>
  );
}

export default MoviesCardList;

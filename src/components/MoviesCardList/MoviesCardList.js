import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  //console.log ("props in cardlist")
  //console.log (props)
  const location = useLocation().pathname;

  let block;

  if (!props.isShort) {
    block = 
      props.cards.map((element, index) => 
        <MoviesCard 
          key = {location === "/movies"? element.id : element._id}
          movieId = {location === "/movies"? element.id : element.movieId}
          country = {element.country}
          created_at = {element.created_at}
          description = {element.description}
          director = {element.director}
          duration = {element.duration}
          image = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          thumbnail = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          nameEN = {element.nameEN}
          nameRU = {element.nameRU}
          trailerLink = {element.trailerLink}
          updated_at = {element.updated_at}
          year = {element.year}

          moviesSavedList={props.moviesSavedList}
          getSavedFilms = {props.getSavedFilms}
          //isLiked={false}
          onLike={props.onLike}
          onUnlike={props.onUnlike}
        />
      )
    }
  else {
    block = 
      props.cards.filter(element => element.duration < 40).map((element, index) =>
        <MoviesCard 
          key = {location === "/movies"? element.id : element._id}
          movieId = {location === "/movies"? element.id : element.movieId}
          country = {element.country}
          created_at = {element.created_at}
          description = {element.description}
          director = {element.director}
          duration = {element.duration}
          image = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          thumbnail = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          nameEN = {element.nameEN}
          nameRU = {element.nameRU}
          trailerLink = {element.trailerLink}
          updated_at = {element.updated_at}
          year = {element.year}

          moviesSavedList={props.moviesSavedList}
          getSavedFilms = {props.getSavedFilms}
          //isLiked={true}
          onLike={props.onLike}
          onUnlike={props.onUnlike}
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

import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function RenderCards(props) {

  //console.log("rendercards")
  //console.log(props)

  const location = useLocation().pathname;

  return (
    <>
    <ul className="card-list">
      {
        props.newCards.map((element, index) => 
        <MoviesCard 
          key = {location === "/movies"? element.id : element.movieId}
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
          onLike={props.onLike}
          onUnlike={props.onUnlike}
        />
      )
      }
    </ul>
    <button 
      className={"movies__button-more" + (props.cards.length <= props.newCards.length || props.cardsCount > props.newCards.length? " movies__button-more_unvisible" : "")} 
      type="button" 
      onClick={props.onClick} >Ещё</button>
    </>
  );
}

export default RenderCards;

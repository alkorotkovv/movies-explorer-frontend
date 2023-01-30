import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  
  const location = useLocation().pathname;
  let isLiked = props.moviesSavedList.some(movie => movie.movieId === props.movieId);
  let likeClass;

  if (isLiked && location === "/movies")
    likeClass = "card__like card__like_active";
  else if (isLiked && location === "/saved-movies")
    likeClass = "card__like card__like_delete";
  else
    likeClass = "card__like";

  const movieData ={
    movieId: props.movieId,
    country: props.country,
    created_at: props.created_at,
    description: props.description,
    director: props.director,
    duration: props.duration,
    image: props.image,
    thumbnail: props.thumbnail,
    nameEN: props.nameEN,
    nameRU: props.nameRU,
    trailerLink: props.trailerLink,
    updated_at: props.updated_at,
    year: props.year
  }

  //Обработчик нажатия на лайк
  function handleLikeClick() {
    if (isLiked) {
      movieData._id = props.moviesSavedList.find(movie => movie.movieId === props.movieId)._id;
      props.onUnlike(movieData);
    }
    else {
      props.onLike(movieData);
    }
  }

  //Обработчик клика на карточку
  function handleLogoClick() {
    window.open(props.trailerLink);
  }

  return (
    <li className="card">
      <div className="card__info">
        <p className='card__title'>{props.nameRU}</p>
        <p className='card__duration'>{Math.floor(props.duration/60) + " ч " + (props.duration%60) + " м"}</p>
        <button className={likeClass} onClick={handleLikeClick} />
      </div>
      <img className="card__logo" src={props.image} alt="логотип" onClick={handleLogoClick} />
    </li>
  );
}

export default MoviesCard;

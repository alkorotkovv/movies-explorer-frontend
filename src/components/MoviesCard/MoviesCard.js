import React from 'react';

function MoviesCard(props) {
  
  //console.log("props in Card")
  //console.log(props);
  
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

  React.useEffect(() => {
    //props.getSavedFilms();
  }, [])

  let isLiked = props.moviesSavedList.some(movie => movie.movieId === props.movieId);

  function handleClick() {
    if (isLiked) {
      movieData._id = props.moviesSavedList.find(movie => movie.movieId === props.movieId)._id;
      props.onUnlike(movieData);
    }
    else {
      props.onLike(movieData);
    }
  }

  return (
    <li className="card">
      <div className="card__info">
        <p className='card__title'>{props.nameRU}</p>
        <p className='card__duration'>{Math.floor(props.duration/60) + " ч " + (props.duration%60) + " м"}</p>
        <button className={"card__like" + (isLiked ? " card__like_active" : "")} onClick={handleClick} />
      </div>
      <img className="card__logo" src={props.image} alt="логотип"/>
    </li>
  );
}

export default MoviesCard;

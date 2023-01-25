import React from 'react';

function MoviesCard(props) {
  
  //console.log("props in Card")
  //console.log(props);

  React.useEffect(() => {
    props.getSavedFilms();
  }, [])

  let isLiked = props.moviesSavedList.some(movie => movie.movieId === props.movieId);

  function handleClick() {
    //console.log(props.getSavedFilms());
    //isLiked = props.moviesSavedList.some(movie => movie.movieId === props.movieId);
    console.log(isLiked)
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

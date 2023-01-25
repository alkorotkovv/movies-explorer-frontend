
function MoviesCard(props) {
  
  const isLiked = props.isLiked;
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

  //console.log("props in Card")
  //console.log(props);

  function handleClick() {
    //console.log("like");
    
    props.onLike(props)
  }

  return (
    <li className="card">
      <div className="card__info">
        <p className='card__title'>{props.nameRU}</p>
        <p className='card__duration'>{Math.floor(props.duration/60) + " ч " + (props.duration%60) + " м"}</p>
        <button className={cardLikeButtonClassName} onClick={handleClick} />
      </div>
      <img className="card__logo" src={props.image} alt="логотип"/>
    </li>
  );
}

export default MoviesCard;

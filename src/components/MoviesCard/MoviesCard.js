import cardLogo from '../../images/film-logo.png';

function MoviesCard(props) {
  console.log(props)
  
  const isLiked = props.isLiked;
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

  return (
    <li className="card">
      <div className="card__info">
        <p className='card__title'>{props.nameRU}</p>
        <p className='card__duration'>{Math.floor(props.duration/60) + " ч " + (props.duration%60) + " м"}</p>
        <button className={cardLikeButtonClassName}/>
      </div>
      <img className="card__logo" src={"https://api.nomoreparties.co" + props.image.url} alt="логотип"/>
    </li>
  );
}

export default MoviesCard;

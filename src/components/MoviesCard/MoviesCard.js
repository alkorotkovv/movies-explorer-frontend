import cardLogo from '../../images/film-logo.png';

function MoviesCard(props) {

  const isLiked = props.isLiked;
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

  return (
    <li className="card">
      <div className="card__info">
        <p className='card__title'>33 слова о дизайне</p>
        <p className='card__duration'>1ч 47м</p>
        <button className={cardLikeButtonClassName}/>
      </div>
      <img className="card__logo" src={cardLogo} alt="логотип"/>
    </li>
  );
}

export default MoviesCard;

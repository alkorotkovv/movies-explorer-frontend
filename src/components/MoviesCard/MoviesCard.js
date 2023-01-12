import cardLogo from '../../images/film-logo.png';

function MoviesCard() {
  return (
    <li className="card">
      <div className="card__info">
        <p className='card__title'>33 слова о дизайне</p>
        <p className='card__duration'>1ч 47м</p>
        <button className="card__like"/>
      </div>
      <img className="card___logo" src={cardLogo} alt="логотип"/>
    </li>
  );
}

export default MoviesCard;

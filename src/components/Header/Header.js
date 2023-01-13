import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import burgerLogo from '../../images/burger.svg';

function Header() {

  const location = useLocation();
  let block;

  // eslint-disable-next-line default-case
  switch (location.pathname) {
    case "/signin":
    case "/signup":
      block = (
        <header className="header header_auth">
          <Link to="/" className="header__logo"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
        </header>
      )
      break;
    case "/profile":
        block = (
          <header className="header header_profile">
            <Link to="/" className="header__logo"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
            <nav className='header__navi'>
              <Link to="/movies" className="header__link header__link_active">Фильмы</Link>
              <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
            </nav>
            <div className='header__buttons'>
              <Link to="/profile" className="header__button header__button_color_gray">Аккаунт</Link>
              <img className="header__burger" src={burgerLogo} alt="бургер" />
          </div>
          </header>
        )
        break;
    case "/movies":
    case "/saved-movies":
      block = (
        <header className="header header_profile">
          <Link to="/" className="header__logo"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
          <nav className='header__navi'>
            <Link to="/movies" className="header__link header__link_active">Фильмы</Link>
            <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
          </nav>
          <div className='header__buttons'>
            <Link to="/profile" className="header__button header__button_color_gray">Аккаунт</Link>
            <img className="header__burger" src={burgerLogo} alt="бургер" />
        </div>
        </header>
      )
      break;
    default:
      block = (
        <header className="header">
          <Link to="/" className="header__logo"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
          <nav className='header__navi'>
            <Link to="/movies" className="header__link header__link_active">Фильмы</Link>
            <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
          </nav>
          <div className='header__buttons'>
            <Link to="/signup" className="header__button">Регистрация</Link>
            <Link to="/signin" className="header__button header__button_color_black">Войти</Link>
            <Link to="/profile" className="header__button header__button_color_gray">Аккаунт</Link>
          </div>
          
        </header>
      )
      break;
  }

  return (
    <>
      {block}    
    </>
  );
}

export default Header;

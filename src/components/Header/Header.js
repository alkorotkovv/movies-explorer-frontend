import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import burgerLogo from '../../images/burger.svg';

function Header(props) {
 
  let block;
  const location = useLocation().pathname;  

  //Обработчик клика на бургер
  function handleBurgerClick() {
    props.onOpenMenu();
  }

  // eslint-disable-next-line default-case
  switch (location) {
    case "/signin":
    case "/signup":
      block = (
        <header className="header header_auth">
          <Link to="/" className="header__link"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
        </header>
      )
      break;
    case "/profile":    
    case "/movies":
    case "/saved-movies":
      block = (
        <header className="header header_profile">
          <Link to="/" className="header__link"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
          <nav className='header__navi'>
            <Link to="/movies" className={"header__link" + (location === "/movies"? " header__link_active" : "")}>Фильмы</Link>
            <Link to="/saved-movies" className={"header__link" + (location === "/saved-movies"? " header__link_active" : "")}>Сохранённые фильмы</Link>
          </nav>
          <div className='header__buttons'>
            <Link to="/profile" className="header__button header__button_color_gray">Аккаунт</Link>
            <img className="header__burger" src={burgerLogo} alt="бургер" onClick={handleBurgerClick} />
        </div>
        </header>
      )
      break;
    default:
      block = (
        <header className="header">
          <Link to="/" className="header__link"><img className="header__logo" src={headerLogo} alt="логотип"/></Link>
          <nav className='header__navi'>
            <Link to="/movies" className={"header__link" + (props.loggedIn? "" : " header__link_unvisible")}>Фильмы</Link>
            <Link to="/saved-movies" className={"header__link" + (props.loggedIn? "" : " header__link_unvisible")}>Сохранённые фильмы</Link>
          </nav>
          <div className='header__buttons'>
            <Link to="/signup" className={"header__button" + (props.loggedIn? " header__button_unvisible" : "")}>Регистрация</Link>
            <Link to="/signin" className={"header__button" + (props.loggedIn? " header__button_unvisible" : "") + " header__button_color_black"}>Войти</Link>
            <Link to="/profile" className={"header__button"  + (props.loggedIn? "" : " header__button_unvisible") + " header__button_color_gray"}>Аккаунт</Link>
            <img className={"header__burger" + (props.loggedIn? "" : " header__burger_unvisible")} src={burgerLogo} alt="бургер" onClick={handleBurgerClick} />
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

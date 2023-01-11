import headerLogo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип"/>
      <div className='header__navi'>
        <button className='header__button'>Регистрация</button>
        <button className='header__button header__button_color_black'>Войти</button>
      </div>
    </header>
  );
}

export default Header;

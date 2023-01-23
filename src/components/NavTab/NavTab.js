

function NavTab() {
  return (
    <nav className="nav">
      <ul className="nav__buttons">
        <li className="nav__button"><a href="#about" className="nav__link">О проекте</a></li>
        <li className="nav__button"><a href="#techs" className="nav__link">Технологии</a></li>
        <li className="nav__button"><a href="#about-me" className="nav__link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;

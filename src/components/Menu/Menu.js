import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import closeLogo from '../../images/close.svg';

function Menu(props) {

  function handleClick(evt) {
    if ( (evt.target.classList.contains('menu_visible')) || (evt.target.classList.contains('menu__item')) )
      handleClose();
  }

  function handleClose() {
      props.onClose();
  }

  const location = useLocation();
  let block;

  switch (location.pathname) {
    case "/sign-in":
      block = (
        <Link to="/sign-up" className="menu__item" title="Зарегистрироваться">Регистрация</Link>
      )
      break;
    case "/sign-up":

      block = (
        <Link to="/sign-in" className="menu__item" title="Войти">Войти</Link>
      )
      break;
    case "/":
      block = (
        <button className="menu__item" title="Выйти">Выйти</button>
      )
      break;
  }

  return (
    <div className={"menu" + (props.isOpen ? " menu_visible" : "")} onClick={handleClick} >
      <ul className={"menu__items" + (props.isOpen ? " menu__items_visible" : "")}>
        <li className="menu__item"><img className="menu__close" src={closeLogo} alt="закрыть" onClick={props.onClose} /></li>
        <li className="menu__item"><Link to="/" className="menu__main" title="Главная" onClick={props.onClose}>Главная</Link></li>
        <li className="menu__item"><Link to="/movies" className="menu__link menu__link_active" title="Фильмы" onClick={props.onClose}>Фильмы</Link></li>
        <li className="menu__item"><Link to="/saved-movies" className="menu__link" title="Сохраненные фильмы" onClick={props.onClose}>Сохраненные фильмы</Link></li>
        <li className="menu__item"><Link to="/profile" className="menu__profile" title="Аккаунт" onClick={props.onClose}>Аккаунт</Link></li>
      </ul>
    </div>
  )
}

export default Menu;
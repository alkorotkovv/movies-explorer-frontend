import React from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox(props) {

  React.useEffect(() => {
    props.onSwitch(isShort);
  }, [])
   
  let isShort;
  switch (useLocation().pathname) {
    case "/movies":
      isShort = JSON.parse(localStorage.getItem("isShort"))
    break;
    case "/saved-movies":
      isShort = JSON.parse(localStorage.getItem("isShortSaved"))
    break;
    default:
      isShort = false
    break;
  }
  
  //Обработчик клика на свитч
  function handleClick() {
    isShort = !isShort;
    props.onSwitch(isShort)
  }

  return (
    <>
    <div className="switch" >
      <input className="switch__checkbox" type="checkbox" id="switch" />
      <label className={"switch__label" + (isShort? " switch__label_checked" : "")} htmlFor="switch" onClick={handleClick}></label>
      <span className="switch__span">Короткометражки</span>
    </div>
    </>
  );
}

export default FilterCheckbox;

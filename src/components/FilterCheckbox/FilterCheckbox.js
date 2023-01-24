import React from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox(props) {

  //let isShort;
  //const checkbox = document.getElementById("switch");
  //console.log(checkbox)

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
      isShort = JSON.parse(localStorage.getItem("isShort"))
      break;
  }
  

  //console.log("самый первый вход isShort  из localstorage")
  //console.log(isShort)
  
  
  //console.log(checkbox.checked)

  function handleClick() {
    //console.log(checkbox.checked)
    //console.log("isShort когда нажали клик")
    //console.log(isShort)

    isShort = !isShort;

    //console.log("isShort должен поменяться")
    //console.log(isShort)

    //localStorage.setItem("isShort", JSON.stringify(isShort));
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

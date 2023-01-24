function FilterCheckbox(props) {

  const checkbox = document.getElementById("switch")

  function handleClick() {
    props.onSwitch(checkbox.checked)
  }

  return (
    <>
    <div className="switch" onClick={handleClick}>
      <input className="switch__checkbox" type="checkbox" id="switch" />
      <label className="switch__label" htmlFor="switch"></label>
      <span className="switch__span">Короткометражки</span>
    </div>    
    </>
  );
}

export default FilterCheckbox;

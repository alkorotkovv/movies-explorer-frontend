function FilterCheckbox() {
  return (
    <>
    <div className="switch">
      <input className="switch__checkbox" type="checkbox" id="switch" />
      <label className="switch__label" for="switch"></label>
      <span className="switch__span">Короткометражки</span>
    </div>
    
    </>
  );
}

export default FilterCheckbox;

import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <form className="search-form">
      <img className="search-form__loupe" src={loupe} alt="лупа"/>
      <input className="search-form__input" type="text" placeholder="Фильм"></input>
      <button className="search-form__button" type="submit"></button>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;

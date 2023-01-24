import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useInput from '../../utils/hooks/useInput';

function SearchForm(props) {

  const inputFilm = useInput("", false);

  function handleSubmit(evt) {
    evt.preventDefault();
    const dataObject = {film: inputFilm.value}
    props.onSubmit(dataObject);
  }

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <img className="search-form__loupe" src={loupe} alt="лупа"/>
      <input 
        className="search-form__input" 
        type="text" 
        value={inputFilm.value} 
        onChange={inputFilm.handleChange}
        placeholder="Фильм" 
        required></input>
      <button className="search-form__button" type="submit" ></button>
      <FilterCheckbox onSwitch={props.onSwitch}/>
    </form>
  );
}

export default SearchForm;

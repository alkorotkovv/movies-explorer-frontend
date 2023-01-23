import React from 'react';
import { Link } from 'react-router-dom';
import Form from "../Form/Form.js";
import useInput from '../../utils/hooks/useInput';
import CurrentUserContext from '../../context/CurrentUserContext.js';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser)

  const inputName = useInput(currentUser.name);
  const inputEmail = useInput(currentUser.email);

  function handleClick() {
    props.onExit();
    //setVisible(false);
  }

  return (
    <main className="profile">
      <Form type="profile" name="profile" >
        <h2 className="form__title form__title_type_profile">Привет, Александр!</h2>
        <fieldset className="form__info form__info_type_profile">
          <div className="form__field form__field_type_profile">
            <label className="form__label form__label_type_profile">Имя</label>
            <input 
              className="form__input form__input_type_profile form__input_content_name" 
              id="input-name" 
              type="text" 
              value={inputName.value}
              onChange={inputName.handleChange}
              name="name" 
              placeholder="Имя" 
              required 
              minLength="2" 
              maxLength="40"/>
            <span className="form__span form__span_type_profile" ></span>
          </div>
          <div className="form__field form__field_type_profile">
            <label className="form__label form__label_type_profile">E-mail</label>
            <input 
              className="form__input form__input_type_profile form__input_content_email" 
              id="input-email" 
              type="text" 
              value={inputEmail.value} 
              onChange={inputEmail.handleChange}
              name="email" 
              placeholder="E-mail" 
              required 
              minLength="2" 
              maxLength="40"/>
            <span className="form__span form__span_type_profile" ></span>
          </div>
        </fieldset>
        <button className="form__save-button form__save-button_type_profile" type="submit" >Редактировать</button>
        <Link to="/signin" className="form__question form__question_type_profile"><span className="form__link form__link_type_profile" onClick={handleClick}>Выйти из аккаунта</span></Link>
      </Form>
    </main>
  )
}

export default Profile;

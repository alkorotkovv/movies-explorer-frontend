import { Link } from 'react-router-dom';
import Form from "../Form/Form.js";

function Profile(props) {

  return (
    <main className="profile">
      <Form type="profile" name="profile" >
        <h2 className="form__title form__title_type_profile">Привет, Александр!</h2>
        <fieldset className="form__info form__info_type_profile">
          <div className="form__field form__field_type_profile">
            <label className="form__label form__label_type_profile">Имя</label>
            <input className="form__input form__input_type_profile form__input_content_name" id="input-name" type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span className="form__span form__span_type_profile" ></span>
          </div>
          <div className="form__field form__field_type_profile">
            <label className="form__label form__label_type_profile">E-mail</label>
            <input className="form__input form__input_type_profile form__input_content_email" id="input-email" type="text" name="email" placeholder="E-mail" required minLength="2" maxLength="40"/>
            <span className="form__span form__span_type_profile" ></span>
          </div>
        </fieldset>
        <button className="form__save-button form__save-button_type_profile" type="submit" >Редактировать</button>
        <Link to="/signup" className="form__question form__question_type_profile"><span class="form__link form__link_type_profile">Выйти из аккаунта</span></Link>
      </Form>
    </main>
  )
}

export default Profile;

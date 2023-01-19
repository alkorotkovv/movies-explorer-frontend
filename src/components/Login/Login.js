import { Link } from 'react-router-dom';
import Form from "../Form/Form.js";

function Login(props) {

  return (
    <main className="login">
      <Form type="auth" name="login" >
        <h2 className="form__title form__title_type_auth">Рады видеть!</h2>
        <fieldset className="form__info">
          <div className="form__field">
            <label className="form__label">E-mail</label>
            <input className="form__input form__input_content_email" id="input-email" type="text" name="email" placeholder="E-mail" required minLength="2" maxLength="40"/>
            <span className="form__span" >Что-то пошло не так...</span>
          </div>
          <div className="form__field">
            <label className="form__label">Пароль</label>
            <input className="form__input form__input_content_password" id="input-password" type="password" name="password" placeholder="Пароль" required minLength="2" maxLength="200"/>
            <span className="form__span" ></span>
          </div>
        </fieldset>
        <button className="form__save-button" type="submit" >Войти</button>
        <Link to="/signup" className="form__question">Ещё не зарегистрированы? <span className="form__link">Регистрация</span></Link>
      </Form>
    </main>
  )
}

export default Login;

import { Link } from 'react-router-dom';

function Register(props) {

  return (
    <main className="auth">
      <form className="form form_type_auth" name="form_register" noValidate>
        <h2 className="form__title form__title_type_auth">Добро пожаловать!</h2>
        <fieldset className="form__info">
          <div className="form__field">
            <label className="form__label">Имя</label>
            <input className="form__input form__input_content_name" id="input-name" type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span className="form__input-error input-name-error" ></span>
          </div>
          <div className="form__field">
            <label className="form__label">E-mail</label>
            <input className="form__input form__input_content_email" id="input-email" type="text" name="email" placeholder="E-mail" required minLength="2" maxLength="40"/>
            <span className="form__input-error input-email-error" >Что-то пошло не так...</span>
          </div>
          <div className="form__field">
            <label className="form__label">Пароль</label>
            <input className="form__input form__input_content_password" id="input-password" type="password" name="password" placeholder="Пароль" required minLength="2" maxLength="200"/>
            <span className="form__input-error input-password-error" ></span>
          </div>
        </fieldset>
        <button className="form__save-button" type="submit" >Зарегистрироваться</button>
        <Link to="/signin" className="form__question">Уже зарегистрированы? <span class="form__link">Войти</span></Link>  
      </form>
    </main>
  )
}

export default Register;

import React from 'react';
import { Link } from 'react-router-dom';
import Form from "../Form/Form.js";
import useInput from '../../utils/hooks/useInput';

function Register(props) {

  const [isValid, setIsValid] = React.useState(false);
  const inputName = useInput("", false);
  const inputEmail = useInput("", false);
  const inputPassword = useInput("", false);

  React.useEffect(() => {
    setIsValid(inputName.isValid && inputEmail.isValid && inputPassword.isValid);
  }, [inputName.isValid, inputEmail.isValid, inputPassword.isValid]);

  return (
    <main className="register">
      <Form type="auth" name="register" onSubmit={props.onSubmit} inName={inputName.value} inEmail={inputEmail.value} inPassword={inputPassword.value}>
        <h2 className="form__title form__title_type_auth">Добро пожаловать!</h2>
        <fieldset className="form__info">
          <div className="form__field">
            <label className="form__label">Имя</label>
            <input 
              className="form__input form__input_content_name" 
              id="input-name" 
              type="text" 
              value={inputName.value} 
              onChange={inputName.handleChange}
              name="name" 
              placeholder="Имя" 
              required 
              pattern="^[\Da-zA-Zа-яА-ЯёЁ -]+$"
              minLength="2" 
              maxLength="40"/>
            <span className="form__span" >{inputName.message}</span>
          </div>
          <div className="form__field">
            <label className="form__label">E-mail</label>
            <input 
              className="form__input form__input_content_email" 
              id="input-email" 
              type="email" 
              value={inputEmail.value} 
              onChange={inputEmail.handleChange}
              name="email" 
              placeholder="E-mail" 
              required 
              minLength="2" 
              maxLength="40"/>
            <span className="form__span" >{inputEmail.message}</span>
          </div>
          <div className="form__field">
            <label className="form__label">Пароль</label>
            <input 
              className="form__input form__input_content_password" 
              id="input-password" 
              type="password" 
              value={inputPassword.value} 
              onChange={inputPassword.handleChange}
              name="password" 
              placeholder="Пароль" 
              required 
              minLength="5" 
              maxLength="200"/>
            <span className="form__span" >{inputPassword.message}</span>
          </div>
        </fieldset>
        <button 
          className={"form__save-button" + (isValid ? "" : " form__save-button_disabled" )} 
          type="submit" 
          disabled={!isValid}>Зарегистрироваться</button>
        <Link to="/signin" className="form__question">Уже зарегистрированы? <span className="form__link">Войти</span></Link>
      </Form>
    </main>
  )
}

export default Register;

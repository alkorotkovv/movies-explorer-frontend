import React from 'react';
import { Link } from 'react-router-dom';
import Form from "../Form/Form.js";
import useInput from '../../utils/hooks/useInput';

function Login(props) {

  const [isValid, setIsValid] = React.useState(false);
  const inputEmail = useInput();
  const inputPassword = useInput();

  React.useEffect(() => {
    setIsValid(inputEmail.isValid && inputPassword.isValid);
  }, [inputEmail.isValid, inputPassword.isValid]);

  return (
    <main className="login">
      <Form type="auth" name="login" >
        <h2 className="form__title form__title_type_auth">Рады видеть!</h2>
        <fieldset className="form__info">
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
          disabled={!isValid}>Войти</button>
        <Link to="/signup" className="form__question">Ещё не зарегистрированы? <span className="form__link">Регистрация</span></Link>
      </Form>
    </main>
  )
}

export default Login;

import React from "react";
import { Route, Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation";
import "./Login.css";
import logo from "../../images/logo.svg";

const Login = ({ onLogin, isLoading }) => {
  const { handleChange, values, isValid } = useFormWithValidation();
  /*   const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  /*   const [message, setMessage] = React.useState('') */

  /*   const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onLogin && values.email && values.password) {
      return onLogin(values.email, values.password);
    }
  };
  return (
    <Route path="/signin">
      <div className="form__container">
        <form onSubmit={handleSubmit} className="form">
          <Link to="">
            <img src={logo} alt="Logo" />
          </Link>
          <p className="form__title">Рады видеть!</p>
          {/*         <p className='register__error'>{inputs.message}</p> */}
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            className="form__input"
            placeholder="pochta@yandex.ru"
            required
            disabled={isLoading}
          />
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password || ""}
            onChange={handleChange}
            className="form__input"
            placeholder="Пароль"
            required
            disabled={isLoading}
          />
          <div className="form__button-container">
            <button
              type="submit"
              className={
                isValid ? "form__submit" : "form__submit form__submit_disabled"
              }
            >
              Войти
            </button>
            <div className="form__sign-in-up">
              <p className="form__text-below-submit">
                Ещё не зарегистрированы?
              </p>
              <Link
                to="signup"
                className="link form__link form__link-below-submit "
              >
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Route>
  );
};

export default Login;

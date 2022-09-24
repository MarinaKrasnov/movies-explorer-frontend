import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation";
import "./Register.css";
import logo from "../../images/logo.svg";

const Register = ({ onRegister }) => {
  const { handleChange, values, isValid } = useFormWithValidation();
  /*  const [values, setvalues] = React.usevalues({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister && values.email) {
      onRegister(values.name, values.email, values.password);
    }
  };

  return (
    <Route path="/signup">
      <div className="form__container">
        <form onSubmit={handleSubmit} className="form">
          <img src={logo} alt="Logo" />
          <p className="form__title">Добро пожаловать!</p>
          <p className="register__error">{values.message}</p>
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            id="name"
            name="name"
            type="name"
            value={values.name}
            onChange={handleChange}
            className="form__input"
            placeholder="Виталий"
            required
          />
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="form__input"
            placeholder="pochta@yandex.ru"
            required
          />
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="form__input"
            placeholder="Пароль"
            required
          />
          <div className="form__button-container">
            <button
              type="submit"
              className={
                isValid ? "form__submit" : "form__submit form__submit_disabled"
              }
            >
              Зарегистрироваться
            </button>
            <div className="form__sign-in-up">
              <p className="form__text-below-submit">Уже зарегистрированы? </p>
              <Link
                to="signin"
                className="link form__link form__link-below-submit "
              >
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Route>
  );
};

export default Register;

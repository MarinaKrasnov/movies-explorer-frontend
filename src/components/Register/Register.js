import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation";
import "./Register.css";
import logo from "../../images/logo.svg";

const Register = ({ onRegister, isLoading }) => {
  const { handleChange, values, isValid } = useFormWithValidation();
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
          <Link to="">
            <img src={logo} alt="Logo" />
          </Link>
          <p className="form__title">Welcome!</p>
          {/*   <p className="register__error">{values.message}</p> */}
          <label htmlFor="name" className="form__label">
            Username
          </label>
          <input
            id="name"
            name="name"
            type="name"
            value={values.name || ""}
            onChange={handleChange}
            className="form__input"
            placeholder="John"
            required
            minLength="2"
            maxLength="30"
            disabled={isLoading}
          />
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
            placeholder="mail@gmail.com"
            disabled={isLoading}
            required
            /*     pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$" */
          />
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password || ""}
            onChange={handleChange}
            className="form__input"
            placeholder="******"
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
              Sing up
            </button>
            <div className="form__sign-in-up">
              <p className="form__text-below-submit">Do you have an account?</p>
              <Link
                to="signin"
                className="link form__link form__link-below-submit "
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Route>
  );
};

export default Register;

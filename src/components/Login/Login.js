import React from "react";
import { Route, Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation";
import "./Login.css";
import logo from "../../images/logo.svg";

const Login = ({ onLogin, isLoading }) => {
  const { handleChange, values, isValid } = useFormWithValidation();
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
          <p className="form__title">Glad to see you!</p>
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
            placeholder="mail@google.com"
            required
            disabled={isLoading}
            /*  pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$" */
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
            placeholder="Password"
            required
            disabled={isLoading}
          />
          <div className="form__button-container">
            <button
              type="submit"
              className={
                isValid ? "form__submit" : "form__submit form__submit_disabled"
              }
              disabled={isLoading}
            >
              Sign in
            </button>
            <div className="form__sign-in-up">
              <p className="form__text-below-submit">Do you have an account?</p>
              <Link
                to="signup"
                className="link form__link form__link-below-submit "
              >
                Signup
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Route>
  );
};

export default Login;

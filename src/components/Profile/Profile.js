import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../Validation";

function Profile({ onEdit, signOut, isLoading }) {
  const { handleChange, values } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const onEditing = (e) => {
    e.preventDefault();
    if (onEdit && values.email) {
      onEdit(values.name, values.email);
    }
  };
  return (
    <Route path="/profile">
      <section className="profile">
        <form
          className="form__container profile__container"
          onSubmit={onEditing}
        >
          <fieldset className=" profile__top">
            <p className="profile__title">Привет, {currentUser.name}!</p>
            <p className="register__error"></p>
            <label htmlFor="name" className="profile__label">
              Имя
              <input
                id="name"
                name="name"
                type="name"
                defaultValue={currentUser.name}
                onChange={handleChange}
                className=" profile__input"
                required
                minLength="2"
                maxLength="30"
                disabled={isLoading}
              />
            </label>
            <div className="profile__line"></div>
            <label htmlFor="email" className="profile__label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                className="profile__input"
                required
                disabled={isLoading}
              />
            </label>
          </fieldset>
          <div className="form__button-container">
            <div className="form__sign-in-up profile__links">
              <button
                type="submit"
                className="button form__text-below-submit profile__edit"
                /*  disabled={!isValid}  */
              >
                Редактировать
              </button>

              <button
                className=" button link form__link form__link-below-submit profile__signout "
                onClick={signOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </Route>
  );
}

export default Profile;

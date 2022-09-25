import React, { useContext } from "react";
import { Route, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../Validation";

function Profile({ onEdit, signOut }) {
  const { handleChange, values, isValid, resetForm } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
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
                defaultValue={values.name}
                onChange={handleChange}
                className=" profile__input"
                placeholder={currentUser.name}
              />
            </label>
            <div className="profile__line"></div>
            <label htmlFor="email" className="profile__label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={values.email}
                onChange={handleChange}
                className="profile__input"
                placeholder={currentUser.email}
              />
            </label>
          </fieldset>
          <div className="form__button-container">
            <div className="form__sign-in-up profile__links">
              {isValid ? (
                <button
                  type="submit"
                  className="button form__text-below-submit profile__edit"
                >
                  Редактировать
                </button>
              ) : (
                ""
              )}
              <Link
                to="signin"
                className="link form__link form__link-below-submit profile__signout "
                onClick={signOut}
              >
                Выйти из аккаунта
              </Link>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </Route>
  );
}

export default Profile;

import React from "react";
import logo from "../../images/logo.svg";
import menu_theme_dark from "../../images/menu_theme_dark.svg";
import menu from "../../images/menu.svg";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ className, isLoggedIn, setPopupOpen,screenSize }) {
  const onPopup = () => {
    setPopupOpen();
  };
  return (
    <header
      className={`header ${
        isLoggedIn && screenSize > 837 ? "header_type_loggedin" : ""
      } ${className ? className : ""} `}
    >
      <Link to="">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {isLoggedIn && screenSize > 837 ? (
        <div>
          <Link to="movies">
            <button
              className={`button font-500 header__link ${
                className ? className : ""
              } `}
            >
              Фильмы
            </button>
          </Link>
          <Link to="saved-movies">
            <button
              className={`button header__link ${className ? className : ""} `}
            >
              Сохранённые фильмы
            </button>
          </Link>
          <Link to="profile">
            <button className="button header__button ">Аккаунт</button>
          </Link>
        </div>
      ) : isLoggedIn && screenSize < 837 ? (
        <img
          src={className === "header_type_main" ? menu_theme_dark : menu}
          className=" header__menu"
          alt="Menu"
          onClick={setPopupOpen}
        />
      ) : !isLoggedIn ? (
        <div>
          <Link to="signup">
            <button
              className={`${className ? className : ""} button header__link`}
            >
              Регистрация
            </button>
          </Link>
          <Link to="signin">
            <button className="link header__link header__signin ">Войти</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;

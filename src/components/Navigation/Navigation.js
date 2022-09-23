import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ isPopupOpen, onClose }) {
  return (
    <div className={`navigation ${isPopupOpen && "navigation_active"}`}>
      <div className="popup">
        <div className="navigation__container">
          <Link to="" className="link">
            <p>Главная</p>
          </Link>
          <Link to="movies" className="link">
            <p className="underline">Фильмы</p>
          </Link>
          <Link to="saved-movies" className="link">
            <p>Сохранённые фильмы</p>
          </Link>
        </div>
        <Link to="profile">
          <button className="button button_type_nav ">Аккаунт</button>
        </Link>
        <button
          type="button"
          className="button navigation__close-btn"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Navigation;

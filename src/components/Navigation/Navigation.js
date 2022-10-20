import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ isPopupOpen, onClose }) {
  return (
    <div
      className={`navigation ${isPopupOpen && "navigation_active"}`}
      onClick={onClose}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="navigation__container">
          <Link to="/" className="link" onClick={onClose}>
            <p>Home</p>
          </Link>
          <Link to="movies" className="link" onClick={onClose}>
            <p>Movies</p>
          </Link>
          <Link to="saved-movies" className="link" onClick={onClose}>
            <p>Saved movies</p>
          </Link>
        </div>
        <Link to="profile">
          <button className="button button_type_nav " onClick={onClose}>
            Account
          </button>
        </Link>
        <button type="button" className="button close-btn" onClick={onClose} />
      </div>
    </div>
  );
}

export default Navigation;

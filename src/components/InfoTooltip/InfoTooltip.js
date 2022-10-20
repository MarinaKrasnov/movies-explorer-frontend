import React from "react";
import success from "../../images/success.svg";
import error from "../../images/error.svg";
import "./InfoTooltip.css";

function InfoTooltip({ message, bool, isOpen, onClose }) {
  const image = bool ? `${success}` : `${error}`;
  const mode = bool ? "Успех" : message;
  return (
    <div className={`overlay ${isOpen && "overlay_active"}`}>
      <div className=" popup_type_message">
        <img
          className="popup_type_message__image"
          src={image}
          alt="System message"
        />
        <h2 className="popup__main-title popup__main-title_type_message">
          {mode}
        </h2>
        <button type="button" className="button close-btn" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;

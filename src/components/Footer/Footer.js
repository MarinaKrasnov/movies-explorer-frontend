import React from "react";
import "./Footer.css";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__title">
        Final project Practicum. Yandex х BeatFilm.
      </p>
      <div className="footer__bottom">
        <p className=" footer_link footer__copyright">©{date}</p>
        <div className="footer__right-container">
          <p className="footer_link"> Practicum. Yandex </p>
          <p className="footer__link"> Github </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";
import logo from "../../images/hero.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <img className="promo__logo" src={logo} alt="Логотип" />
      <h1 className="promo__title">
        Student project for the web development faculty.
      </h1>
      <p className="promo__subtitle">
        Scroll down to find out more about this project and its creator.
      </p>
      <a href="#about" className="link promo__link">
        Tell me more
      </a>
    </section>
  );
}

export default Promo;

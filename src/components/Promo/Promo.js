import React from "react";
import logo from "../../images/hero.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <img className="promo__logo" src={logo} alt="Логотип" />
      <h1 className="promo__title">
        Учебный проект студента&nbsp;факультета Веб-разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <p className="promo__link">Узнать больше</p>
    </section>
  );
}

export default Promo;

import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";
import me from "../../images/me.png";

function Portfolio() {
  return (
    <section className=" section portfolio">
      <p className="title">Студент</p>
      <div className="portfolio__container">
        <div className="portfolio__text-container">
          <h2 className=" portfolio__title">Марина</h2>
          <h3 className="portfolio__subtitle">Софт-разработчик </h3>
          <p className=" portfolio__text">
            Я родилась в Москве, закончила факультет экономики МГАУ по
            специальности "Информационные системы в экономике". Переехала в
            Израиль, здесь я люблю ходить в длинные пешие прогулки на природу с
            группой единомышленников. После того как закончила курс получила
            предложение сделать приложение для местного небольшого бизнеса.
          </p>
        </div>
        <img className="portfolio__image" src={me} alt="the Author" />
      </div>

      <a
        className="link  portfolio__github"
        href="https://github.com/MarinaKrasnov"
        target="_blank"
        rel=" noreferrer"
      >
        Github
      </a>
      <p className="portfolio__portfolio">Портфолио</p>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a
            className="link"
            href="https://marinakrasnov.github.io/how-to-learn/"
            target="_blank"
            rel=" noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__link">
          <a
            className="link"
            href="https://marinakrasnov.github.io/russian-travel/"
            target="_blank"
            rel=" noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className=" portfolio__link">
          <a
            className="link"
            href="http://marina.nomorepartiesxyz.ru"
            target="_blank"
            rel=" noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

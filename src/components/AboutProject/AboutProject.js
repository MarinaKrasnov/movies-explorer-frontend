import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about" className="about-project">
      <h2 className="title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__container-item">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__container-item">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
            было&nbsp; соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scale">
        <p className="about-project__scale-left">1 неделя</p>

        <p className="about-project__scale-right">4 недели</p>
      </div>
      <div className="about-project__scale">
        <p className="about-project__scale-left-below">Back-end</p>

        <p className="about-project__scale-right-below">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;

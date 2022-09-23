import React from "react";
import "./Tech.css";

function Tech() {
  return (
    <section className="section tech">
      <h2 className="title">Технологии</h2>
      <div>
        <h3 className="tech__title">7 технологий</h3>
        <p className="tech__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <div className="tech__items">
        <p className="tech__item">HTML</p>
        <p className="tech__item">CSS</p>
        <p className="tech__item">JS</p>
        <p className="tech__item">React</p>
        <p className="tech__item">Git</p>
        <p className="tech__item">Express.js</p>
        <p className="tech__item">mongoDB</p>
      </div>
    </section>
  );
}

export default Tech;

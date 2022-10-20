import React from "react";
import "./Tech.css";

function Tech() {
  return (
    <section className="section tech">
      <h2 className="title">Tech stack</h2>
      <div>
        <h3 className="tech__title">7 technologies</h3>
        <p className="tech__subtitle">
          In this 10-month course we learned the following technologies that
          were used in the graduation project.
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

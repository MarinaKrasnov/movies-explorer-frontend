import React from "react";
import "./Portfolio.css";
import me from "../../images/me.png";

function Portfolio() {
  return (
    <section className=" section portfolio">
      <p className="title">Web developer</p>
      <div className="portfolio__container">
        <div className="portfolio__text-container">
          <h2 className=" portfolio__title">Marina</h2>
          <h3 className="portfolio__subtitle">Software Engineer </h3>
          <p className=" portfolio__text">
            This is my final project in the 10-month Full Stack Developer Course
            at Practicum by Yandex, started in November 2021. During my learning
            journey I helped other students with questions related to
            course/sprints assignments and projects. The project's Frontend uses
            React and the Backend/API uses NodeJS, ExpressJS, MongoDB, Mongoose.
            Basically, this app allows users to search movies using a public
            Movies API service. The Practicum's curriculum provided a wide range
            of projects based on the following Full Stack Development
            technologies: HTML5, CSS3, flexbox, grid layout, BEM, Media queries,
            transition, JavaScript/JSX, DOM, Debugging, Git, Github, Figma, Form
            validation, OOP, Webpack, NPM, Bash, React, React components, React
            Hooks, NodeJS, ExpressJS, Database, MongoDB, Mongoose.
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
      <p className="portfolio__portfolio">Portfolio</p>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a
            className="link"
            href="https://marinakrasnov.github.io/how-to-learn/"
            target="_blank"
            rel=" noreferrer"
          >
            Static website
          </a>
        </li>
        <li className="portfolio__link">
          <a
            className="link"
            href="https://marinakrasnov.github.io/russian-travel/"
            target="_blank"
            rel=" noreferrer"
          >
            Adaptive layout
          </a>
        </li>
        <li className=" portfolio__link">
          <a
            className="link"
            href="http://marina.nomorepartiesxyz.ru"
            target="_blank"
            rel=" noreferrer"
          >
            SPA (Single Page Application)
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

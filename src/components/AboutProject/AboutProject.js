import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about" className="about-project">
      <h2 className="title">About project</h2>
      <div className="about-project__container">
        <div className="about-project__container-item">
          <h3 className="about-project__subtitle">
            Graduation project consisted of five stajes
          </h3>
          <p className="about-project__text">
            Setting a plan, creating backend, page layout, adding functionality
            and final fixes.
          </p>
        </div>
        <div className="about-project__container-item">
          <h3 className="about-project__subtitle">
            According to the plan there were five weeks to finish the project
          </h3>
          <p className="about-project__text">
            Each stage had a soft and hard deadline which needed to be kept in
            order to submit the project successfully
          </p>
        </div>
      </div>
      <div className="about-project__scale">
        <p className="about-project__scale-left">1 week</p>

        <p className="about-project__scale-right">4 weeks</p>
      </div>
      <div className="about-project__scale">
        <p className="about-project__scale-left-below">Back-end</p>

        <p className="about-project__scale-right-below">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;

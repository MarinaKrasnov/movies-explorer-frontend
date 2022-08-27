import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Tech from "../Tech/Tech";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import { Route } from "react-router-dom";

function Main() {
  return (
    <Route path="/">
      <main className="main">
        <Promo />
        <AboutProject />
        <Tech />
        <Portfolio />
      </main>
      <Footer />
    </Route>
  );
}

export default Main;

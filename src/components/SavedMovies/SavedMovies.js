import React from "react";
import { Route } from "react-router-dom";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({ savedMovies }) {
  const { isLoading, setIsLoading } = React.useState(false);
  return (
    <Route path="/saved-movies">
      <main className="main">
        <SearchForm
          setIsLoading={setIsLoading}
          /*     setMovies={setMovies}
        movies={movies} */
        />
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : (
          <MoviesCardList movies={savedMovies} />
        )}
      </main>
      <Footer />
    </Route>
  );
}

export default SavedMovies;

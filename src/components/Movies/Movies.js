import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { Route } from "react-router-dom";

function Movies({ movies, setMovies }) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Route path="/movies">
      <main className="main">
        <SearchForm
          setIsLoading={setIsLoading}
          setMovies={setMovies}
          movies={movies}
        />
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : (
          <MoviesCardList movies={movies} />
        )}
      </main>
      <Footer />
    </Route>
  );
}

export default Movies;

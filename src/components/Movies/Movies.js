import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { Route } from "react-router-dom";

function Movies({
  movies,
  screenSize,
  jwt,
  savedMovies,
  setSavedMovies,
  setMovies,
  filter,
  filterMoviesByDuration,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortfilmSwitchOn, setShortfilmSwitch] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(false);
  React.useEffect(() => {
    if (filteredMovies === []) {
      console.log(JSON.parse(localStorage.getItem("searchQuery")));
      filter(JSON.parse(localStorage.getItem("searchQuery")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]);

  //Handlers
  const handleSwitch = (value) => {
    setShortfilmSwitch(value);
    const filteredMoviesData = value
      ? filteredMovies.filter(filterMoviesByDuration)
      : filteredMovies;
    localStorage.setItem("switch", value);
    setFilteredMovies(filteredMoviesData);
    /*     console.log("handleSwitch movies", filteredMovies); */
  };
  const handleSearchFormSubmit = (searchQuery) => {
    setIsLoading(true);
    /*     console.log("searchQuery", searchQuery); */
    filter(searchQuery);
    let filteredMoviesData = filter(searchQuery, isShortfilmSwitchOn);
    /*     console.log(filteredMovies); */
    setFilteredMovies(filteredMoviesData);
    if (filteredMoviesData === []) {
      setNotFound(true);
    } else {
      setFilteredMovies(filteredMoviesData);
    }
    setIsLoading(false);
  };

  return (
    <Route path="/movies">
      <main className="main">
        <SearchForm
          /* setIsLoading={setIsLoading} */

          setShortfilmSwitch={setShortfilmSwitch}
          onSubmit={handleSearchFormSubmit}
          onSwitch={handleSwitch}
        />
        {isLoading && false ? (
          <Preloader isLoading={isLoading} />
        ) : rMovies ? (
          <p className="movies__not-found">без результатов поиска</p>
        ) : (
          <MoviesCardList
            movies={filteredMovies}
            screenSize={screenSize}
            jwt={jwt}
            setSavedMovies={setSavedMovies}
            savedMovies={savedMovies}
            setMovies={setMovies}
          />
        )}
      </main>
      <Footer />
    </Route>
  );
}

export default Movies;

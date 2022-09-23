import React from "react";
import { Route } from "react-router-dom";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({
  savedMovies,
  jwt,
  screenSize,
  setSavedMovies,
  getSavedMoviesData,
  filter,
  filterMoviesByDuration,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortfilmSwitchOn, setShortfilmSwitch] = React.useState(false);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(false);
  React.useEffect(() => {
    if (!savedMovies) {
      getSavedMoviesData();
    }
  }, [getSavedMoviesData, savedMovies]);

  /*   React.useEffect(() => {
    if (filteredMovies === []) {
      console.log(JSON.parse(localStorage.getItem("searchQuery")));
      filter(JSON.parse(localStorage.getItem("searchQuery")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]); */

  //Handlers
  const handleSwitch = (value) => {
    setIsFiltered(true);
    setShortfilmSwitch(value);
    const filteredMoviesData = value
      ? savedMovies.filter(filterMoviesByDuration)
      : savedMovies;
    setFilteredMovies(filteredMoviesData);
    if (filteredMoviesData === []) {
      setNotFound(true);
    }
    /*     setSavedMovies(filteredMoviesData); */
    /*     console.log("handleSwitch movies", filteredMovies); */
  };
  const handleSearchFormSubmit = (searchQuery) => {
    setIsLoading(true);
    /*     console.log("searchQuery", searchQuery); */
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
    <Route path="/saved-movies">
      <main className="main">
        <SearchForm
          setIsLoading={setIsLoading}
          /*     setMovies={setMovies}
        movies={movies} */
          setShortfilmSwitch={setShortfilmSwitch}
          onSubmit={handleSearchFormSubmit}
          onSwitch={handleSwitch}
        />
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : rMovies ? (
          <p className="movies__not-found">без результатов поиска</p>
        ) : (
          <MoviesCardList
            savedMovies={isFiltered ? filteredMovies : savedMovies}
            screenSize={screenSize}
            jwt={jwt}
            setSavedMovies={setSavedMovies}
            getSavedMoviesData={getSavedMoviesData}
          ></MoviesCardList>
        )}
      </main>
      <Footer />
    </Route>
  );
}

export default SavedMovies;

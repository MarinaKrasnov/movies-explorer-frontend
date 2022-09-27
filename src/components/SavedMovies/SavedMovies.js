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
  const [isSavedShortfilmSwitchOn, setSavedShortfilmSwitch] =
    React.useState(false);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [filteredSavedMovies, setfilteredSavedMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(true);
  /*   const [searchQuery, setSearchQuery] = React.useState(""); */
  React.useEffect(() => {
    const displayedMovies = isFiltered ? filteredSavedMovies : savedMovies;
    if (displayedMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredSavedMovies, savedMovies, isFiltered]);
  //Handlers
  const handleSwitch = (value) => {
    setIsFiltered(true);
    setSavedShortfilmSwitch(value);
    if (savedMovies.length === 0) {
      setNotFound(true);
    } else {
      const filteredSavedMoviesData = value
        ? savedMovies.filter(filterMoviesByDuration)
        : savedMovies;
      setfilteredSavedMovies(filteredSavedMoviesData);
      if (filteredSavedMoviesData.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }
  };
  const handleSearchFormSubmit = async (searchQuery) => {
    try {
      setIsLoading(true);
      setIsFiltered(true);
      /* setSearchQuery(searchQuery); */
      console.log("searchQuery", searchQuery);
      if (!savedMovies || !filteredSavedMovies) {
        setNotFound(true);
      } else {
        setNotFound(false);
        let filteredSavedMoviesData = filter(
          searchQuery,
          isSavedShortfilmSwitchOn
        );
        setfilteredSavedMovies(filteredSavedMoviesData);
        console.log(filteredSavedMovies);
        console.log(filteredSavedMoviesData);
        if (filteredSavedMoviesData !== []) {
          setNotFound(false);
        }
        setIsLoading(false);
      }
    } catch (e) {
      setNotFound(true);
      setfilteredSavedMovies([]);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Route path="/saved-movies">
      <main className="main">
        <SearchForm
          setIsLoading={setIsLoading}
          onSubmit={handleSearchFormSubmit}
          onSwitch={handleSwitch}
          setShortfilmSwitch={setSavedShortfilmSwitch}
        />
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : rMovies ? (
          <p className="movies__not-found">«Ничего не найдено»</p>
        ) : (
          <MoviesCardList
            savedMovies={isFiltered ? filteredSavedMovies : savedMovies}
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

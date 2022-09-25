import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { Route } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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
  const [searchQuery, setSearchQuery] = React.useState("");
  /* const [isFiltered, setIsFiltered] = React.useState(false); */
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const movieRender = React.useCallback(() => {
    const switchValue = JSON.parse(
      localStorage.getItem(`switch-${currentUser._id}`)
    );
    const searchQuery = JSON.parse(
      localStorage.getItem(`searchQuery-${currentUser._id}`)
    );
    if (switchValue || searchQuery) {
      setShortfilmSwitch(switchValue);
      if (searchQuery) {
        setSearchQuery(searchQuery);
        const filteredMoviesData = filter(searchQuery, isShortfilmSwitchOn);
        setFilteredMovies(filteredMoviesData);
      } else {
        setFilteredMovies([]);
        setNotFound(true);
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isShortfilmSwitchOn]);
  React.useEffect(() => {
    movieRender();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieRender]);

  //Handlers
  const handleSwitch = (value) => {
    console.log(value);
    localStorage.setItem(`switch-${currentUser._id}`, JSON.stringify(value));
    if (value) {
      setShortfilmSwitch(true);
      /*       setIsFiltered(true); */
      const filteredMoviesData = value
        ? filteredMovies.filter(filterMoviesByDuration)
        : filteredMovies;
      localStorage.setItem(`switch-${currentUser._id}`, JSON.stringify(true));
      setFilteredMovies(filteredMoviesData);
    } else {
      setShortfilmSwitch(false);
      console.log(isShortfilmSwitchOn);
      /*    console.log(
        "localStorage.getItem(se)",
        localStorage.getItem(`searchQuery-${currentUser._id}`)
      ); */
      handleSearchFormSubmit(
        JSON.parse(localStorage.getItem(`searchQuery-${currentUser._id}`))
      );
    }
    /*     console.log("handleSwitch movies", filteredMovies); */
  };
  const handleSearchFormSubmit = (searchQuery) => {
    setIsLoading(true);
    /* setIsFiltered(true); */
    /*     console.log("searchQuery", searchQuery); */
    let filteredMoviesData = filter(searchQuery, isShortfilmSwitchOn);
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
          onSubmit={handleSearchFormSubmit}
          onSwitch={handleSwitch}
        />
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : rMovies ? (
          <p className="movies__not-found">«Ничего не найдено»</p>
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

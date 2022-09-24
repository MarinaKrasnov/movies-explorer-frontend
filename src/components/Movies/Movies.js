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
  /* const [isFiltered, setIsFiltered] = React.useState(false); */
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (
      localStorage.getItem(`switch-${currentUser._id}`) ||
      localStorage.getItem(`searchQuery-${currentUser._id}`)
    ) {
      setShortfilmSwitch(
        JSON.parse(localStorage.getItem(`switch-${currentUser._id}`))
      );

      if (localStorage.getItem(`searchQuery-${currentUser._id}`)) {
        const filteredMoviesData = filter(
          JSON.parse(localStorage.getItem(`searchQuery-${currentUser._id}`)),
          isShortfilmSwitchOn
        );
        setFilteredMovies(filteredMoviesData);
      } else {
        setFilteredMovies([]);
      }
      if (filteredMovies === []) {
        setNotFound(true);
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handlers
  const handleSwitch = (value) => {
    /*     console.log(value); */
    if (value === true) {
      setShortfilmSwitch(true);
      /*       setIsFiltered(true); */
      const filteredMoviesData = value
        ? filteredMovies.filter(filterMoviesByDuration)
        : filteredMovies;
      localStorage.setItem(`switch-${currentUser._id}`, JSON.stringify(true));
      setFilteredMovies(filteredMoviesData);
    } else {
      setShortfilmSwitch(false);
      /*    console.log(isShortfilmSwitchOn); */
      localStorage.setItem(`switch-${currentUser._id}`, JSON.stringify(false));
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

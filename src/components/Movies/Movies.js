import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { Route } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesApi from "../../utils/MoviesApi";

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
  const currentUser = React.useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortfilmSwitchOn, setShortfilmSwitch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(true);
  const queryData = localStorage.getItem(`searchResult-${currentUser._id}`);

  React.useEffect(() => {
    if (!!queryData) {
      setFilteredMovies(JSON.parse(queryData)?.filteredMoviesData);
      setShortfilmSwitch(JSON.parse(queryData)?.isShortfilmSwitchOn);
      setSearchQuery(JSON.parse(queryData)?.searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);
  React.useEffect(() => {
    if (!!filteredMovies && filteredMovies.length !== 0) {
      setNotFound(false);
    }
  }, [filteredMovies]);
  //Handlers
  const handleSwitch = (value) => {
    setShortfilmSwitch(value);
    if (value) {
      const filteredMoviesData = filteredMovies.filter(filterMoviesByDuration);
      setFilteredMovies(filteredMoviesData);
      if (filteredMoviesData.length !== 0) {
        setNotFound(false);
      }
    } else {
      let filteredMoviesData = filter(searchQuery, false);
      setFilteredMovies(filteredMoviesData);
      if (filteredMoviesData.length !== 0) {
        setNotFound(false);
      }
    }
  };
  const handleSearchFormSubmit = async (searchQuery) => {
    try {
      setIsLoading(true);
      setSearchQuery(searchQuery);
      if (!movies || movies.length === 0) {
        const allMoviesData = await MoviesApi.getMovies();
        localStorage.setItem(
          `movies-${currentUser._id}`,
          JSON.stringify(allMoviesData)
        );
        setMovies(allMoviesData);
      }
      let filteredMoviesData = await filter(searchQuery, isShortfilmSwitchOn);
      setFilteredMovies(filteredMoviesData);
      const searchResultData = {
        filteredMoviesData,
        isShortfilmSwitchOn,
        searchQuery,
      };

      localStorage.setItem(
        `searchResult-${currentUser._id}`,
        JSON.stringify(searchResultData)
      );
    } catch (e) {
      setNotFound(true);
      setFilteredMovies([]);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Route path="/movies">
      <main className="main">
        <SearchForm
          /* setIsLoading={setIsLoading} */
          onSubmit={handleSearchFormSubmit}
          onSwitch={handleSwitch}
          isShortfilmSwitchOn={isShortfilmSwitchOn}
          setShortfilmSwitch={setShortfilmSwitch}
        />
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : rMovies ? (
          <p className="movies__not-found">«Nothing found»</p>
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

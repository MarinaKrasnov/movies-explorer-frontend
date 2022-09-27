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
  const currentUser = React.useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortfilmSwitchOn, setShortfilmSwitch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResult, setSearchResult] = React.useState({});
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [rMovies, setNotFound] = React.useState(true);
  /*   React.useEffect(() => {
    if (!!localStorage.getItem(`switch-${currentUser._id}`)) {
      const switchValue = localStorage.getItem(`switch-${currentUser._id}`);
      setShortfilmSwitch(switchValue);
    } else {
      setShortfilmSwitch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortfilmSwitchOn]); */
  /*   const getResult = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
/*     const updatedQueryData = localStorage.getItem(
      `searchResult-${currentUser._id}`
    )
      ? JSON.parse(localStorage.getItem(`searchResult-${currentUser._id}`))
      : searchResult;
    console.log(updatedQueryData.filteredMoviesData);
    setShortfilmSwitch(updatedQueryData.isShortfilmSwitchOn);
    setFilteredMovies(updatedQueryData.filteredMoviesData);
    let filteredMovies = updatedQueryData.filteredMoviesData;
    console.log(filteredMovies);
    setNotFound(false); */

  React.useEffect(() => {
    if (
      filteredMovies.length === 0 &&
      !!localStorage.getItem(`searchResult-${currentUser._id}`)
    ) {
      const updatedQueryData = localStorage.getItem(
        `searchResult-${currentUser._id}`
      )
        ? JSON.parse(localStorage.getItem(`searchResult-${currentUser._id}`))
        : searchResult;
      console.log(updatedQueryData.filteredMoviesData);
      setShortfilmSwitch(updatedQueryData.isShortfilmSwitchOn);
      setFilteredMovies(updatedQueryData.filteredMoviesData);
      let filteredMovies = updatedQueryData.filteredMoviesData;
      console.log(filteredMovies);
      setNotFound(false);
      if (filteredMovies.length !== 0) {
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      console.log(rMovies);
      console.log(filteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]);
  /*   React.useEffect(() => {
    if (filteredMovies) {
      setFilteredMovies(filteredMovies);
    }
  }, [filteredMovies, rMovies]); */
  /*   React.useEffect(() => {}, []); */
  /*   React.useEffect(() => { */
  /*     console.log(!!localStorage.getItem(`searchQuery-${currentUser._id}`));
    console.log(localStorage.getItem(`searchQuery-${currentUser._id}`));
    console.log(currentUser._id); */
  /*     const searchQueryData = localStorage.getItem(
      `searchQuery-${currentUser._id}`
    );
    if (!!searchQueryData && searchQueryData !== "undefined") {
      setSearchQuery(
        JSON.parse(localStorage.getItem(`searchQuery-${currentUser._id}`))
      );
      console.log(searchQuery);
    } */
  /*     const searchResult = localStorage.getItem(
      `searchResult-${currentUser._id}`
    );
    if (!!searchResult && searchResult !== "undefined") {
      setFilteredMovies(searchResult);
    }
  }, [currentUser._id, searchResult]); */
  /*   React.useEffect(() => {
    if (isShortfilmSwitchOn || !!searchQuery) {
      console.log(searchQuery);
      console.log(isShortfilmSwitchOn);
      console.log(isShortfilmSwitchOn || !!searchQuery);
      let filteredMoviesData = filter(searchQuery, isShortfilmSwitchOn);
      setFilteredMovies(filteredMoviesData);
      console.log(filteredMoviesData);
      console.log(filteredMovies);
    } else {
      setFilteredMovies([]);
      setNotFound(false);
      console.log(filteredMovies);
    }
    setIsLoading(false);
    console.log(filteredMovies);
    console.log(rMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isShortfilmSwitchOn]); */
  /*   React.useEffect(() => {}, []); */
  //Handlers
  const handleSwitch = (value) => {
    localStorage.setItem(`switch-${currentUser._id}`, value);
    setShortfilmSwitch(value);
    if (value) {
      const filteredMoviesData = value
        ? filteredMovies.filter(filterMoviesByDuration)
        : filteredMovies;
      setFilteredMovies(filteredMoviesData);
      if (filteredMoviesData.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      handleSearchFormSubmit(searchQuery);
    }
  };
  const handleSearchFormSubmit = async (searchQuery) => {
    setIsLoading(true);
    try {
      setSearchQuery(searchQuery);
      /*       localStorage.setItem(
        `searchQuery-${currentUser._id}`,
        JSON.stringify(searchQuery)
      ); */
      let filteredMoviesData = await filter(searchQuery, isShortfilmSwitchOn);
      setFilteredMovies(filteredMoviesData);
      console.log(filteredMovies);
      console.log(filteredMoviesData);

      const searchResultData = { filteredMoviesData, isShortfilmSwitchOn };

      console.log(searchResultData);
      localStorage.setItem(
        `searchResult-${currentUser._id}`,
        JSON.stringify(searchResultData)
      );
      setSearchResult(searchResultData);
    } catch (e) {
      setNotFound(true);
      setFilteredMovies([]);
      console.log(e);
    } finally {
      /*   if (filteredMovies.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      } */
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

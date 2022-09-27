import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import {
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LARGE_PAGE_CARDS_COUNT,
  LARGE_NEXT_PAGE_CARDS_COUNT,
  MEDIUM_PAGE_CARDS_COUNT,
  MEDIUM_NEXT_PAGE_CARDS_COUNT,
  SMALL_PAGE_CARDS_COUNT,
  SMALL_NEXT_PAGE_CARDS_COUNT,
  ADDING_PAGE_AMOUNT_S,
  ADDING_PAGE_AMOUNT_M,
  ADDING_PAGE_AMOUNT_L,
} from "../../utils/constants";
function MoviesCardList({
  movies,
  screenSize,
  jwt,
  savedMovies,
  setSavedMovies,
  getSavedMoviesData,
  setMovies,
}) {
  //Constants
  const [showned, setNumberOfShowed] = React.useState(5);
  const [isMore, setMore] = React.useState(false);
  const location = useLocation();
  const moviesList =
    location.pathname === "/saved-movies" ? savedMovies : movies;
  //Effects
  React.useEffect(() => {
    let numderOfShowned =
      screenSize < MOBILE_WIDTH
        ? SMALL_PAGE_CARDS_COUNT
        : screenSize < TABLET_WIDTH
        ? MEDIUM_PAGE_CARDS_COUNT
        : LARGE_PAGE_CARDS_COUNT;
    setNumberOfShowed(numderOfShowned);
  }, [screenSize]);
  React.useEffect(() => {
    let isThereMore =
      screenSize < MOBILE_WIDTH &&
      moviesList.length > SMALL_NEXT_PAGE_CARDS_COUNT
        ? true
        : screenSize < TABLET_WIDTH &&
          moviesList.length > MEDIUM_NEXT_PAGE_CARDS_COUNT
        ? true
        : screenSize > TABLET_WIDTH &&
          moviesList.length > LARGE_NEXT_PAGE_CARDS_COUNT
        ? true
        : false;
    setMore(isThereMore);
  }, [isMore, screenSize, moviesList.length]);
  //Handlers
  const handleMoreClick = () => {
    const moreNumber =
      screenSize < MOBILE_WIDTH
        ? ADDING_PAGE_AMOUNT_S
        : screenSize < TABLET_WIDTH
        ? ADDING_PAGE_AMOUNT_M
        : ADDING_PAGE_AMOUNT_L;
    let newShowned = showned + moreNumber;
    if (newShowned >= moviesList.length) {
      newShowned = moviesList.length;
      setMore(false);
    }
    setNumberOfShowed(newShowned);
    return;
  };
  return (
    <>
      <section className="movies-card-list">
        {moviesList
          .map((item) => (
            <MoviesCard
              item={item}
              key={item._id || item.movieId}
              jwt={jwt}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
              getSavedMoviesData={getSavedMoviesData}
              setMovies={setMovies}
            />
          ))
          .slice(0, showned)}
      </section>
      <div
        className={`movies-card-list__container-more ${
          isMore ? "movies-card-list__container-more_visible" : ""
        }`}
      >
        <button className="button" onClick={handleMoreClick}>
          <p className="movies-card-list__more">Ещё</p>
        </button>
      </div>
    </>
  );
}

export default MoviesCardList;

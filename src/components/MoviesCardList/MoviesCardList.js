import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
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
    let numderOfShowned = screenSize < 437 ? 5 : screenSize < 837 ? 8 : 12;
    setNumberOfShowed(numderOfShowned);
  }, [screenSize]);
  React.useEffect(() => {
    let isThereMore =
      screenSize < 437 && moviesList.length > 6
        ? true
        : screenSize < 837 && moviesList.length > 9
        ? true
        : screenSize > 837 && moviesList.length > 12
        ? true
        : false;
    setMore(isThereMore);
  }, [isMore, screenSize, moviesList.length]);
  //Handlers
  const handleMoreClick = () => {
    const moreNumber = screenSize < 437 ? 2 : screenSize < 837 ? 4 : 6;
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

import React from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MainApi from "../../utils/MainApi";

import "./MoviesCard.css";

function MoviesCard({ item, setSavedMovies, savedMovies, jwt }) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const isItemSaved = !!savedMovies
    ? savedMovies.some((movie) => movie.movieId === item.movieId)
    : false;

  const MoviesSavedButtonClassName = `button ${
    location.pathname === "/saved-movies"
      ? "movies-card__button-delete "
      : isItemSaved
      ? "movies-card__button-saved"
      : "movies-card__button-save"
  }`;

  const handleDelete = (item) => {
    const savedMovie = savedMovies.find(
      (movie) => movie.movieId === item.movieId
    );
    MainApi.deleteMovie(savedMovie._id, jwt)
      .then((deletedMovie) => {
        if (deletedMovie.message) {
          MainApi.getSavedMovies(jwt).then((savedMovies) => {
            localStorage.setItem(
              `savedMovies-${currentUser._id}`,
              JSON.stringify(savedMovies)
            );
            setSavedMovies(savedMovies);
          });
        } else {
          const movies = savedMovies.filter((movie) => {
            return deletedMovie.data._id !== movie._id;
          });
          localStorage.setItem(
            `savedMovies-${currentUser._id}`,
            JSON.stringify(movies)
          );
          setSavedMovies(movies);
        }
      })
      .catch((err) => {
        MainApi.getSavedMovies(jwt).then((savedMovies) => {
          localStorage.setItem(
            `savedMovies-${currentUser._id}`,
            JSON.stringify(savedMovies)
          );
          setSavedMovies(savedMovies);
        });
        alert(`Error ${err}, try again`);
      });
  };
  const handleSaveClick = () => {
    location.pathname === "/saved-movies"
      ? handleDelete(item)
      : isItemSaved
      ? handleDelete(item)
      : MainApi.saveMovie(item, jwt)
          .then((item) => {
            const savedMoviesElements =
              savedMovies === null ? [item] : [...savedMovies, item];
            localStorage.setItem(
              `savedMovies-${currentUser._id}`,
              JSON.stringify(savedMoviesElements)
            );
            setSavedMovies(savedMoviesElements);
          })
          .catch((err) => {
            alert(`Error ${err}, try again`);
          });
  };
  function handleCardClick() {
    window.open(item.trailerLink);
  }

  return (
    <article className="movies-card" aria-label="Карточка" key={item.movieId}>
      <img
        className="movies-card__image"
        /*      src={`${MoviesApi._url}${item.image.url}`} */
        src={item.image}
        /*      style={{ backgroundImage: `url(${item.image})` }} */
        alt={`Обложка ${item.nameEN}`}
        /*  onClick={window.open(`${item.trailer}, '_blank', 'location=yes,scrollbars=yes,status=yes'`)} */
        /*           onClick={handleCardClick} */
        onClick={handleCardClick}
      />
      <>
        <button
          type="button"
          className={MoviesSavedButtonClassName}
          aria-label="Button"
          onClick={handleSaveClick}
        />
        <div className="movies-card__info">
          <h3 className="movies-card__text">{item.nameEN}</h3>
          <p className="movies-card__duration">{item.duration}</p>
        </div>
      </>
    </article>
  );
}

export default MoviesCard;

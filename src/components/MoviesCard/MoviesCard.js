import React from "react";
/* import { CurrentUserContext } from "../../contexts/CurrentUserContext"; */
import "./MoviesCard.css";

function MoviesCard({ item }) {
  const [isSaved, setIsSaved] = React.useState(false);

  /* const currentUser = React.useContext(CurrentUserContext); */
  /*   const currentUser = { _id: 1 };
  const isOwn = item.owner === currentUser._id;
  const MoviesDeleteButtonClassName = `button movies-card__button-delete ${
    isOwn
      ? "movies-card__button-delete_visible"
      : "movies-card__button-delete_hidden"
  }`; */
  /*   const isSaved = item.likes.some((i) => i === currentUser._id); */
  const MoviesSavedButtonClassName = `button ${
    isSaved ? "movies-card__button-saved" : "movies-card__button-save"
  }`;
  const handleSaveClick = () => {
    setIsSaved((current) => !current);
  };
  return (
    <article className="movies-card" aria-label="Карточка" key={item._id}>
      <img
        className="movies-card__image"
        src={item.image}
        /*      style={{ backgroundImage: `url(${item.image})` }} */
        alt={`Обложка ${item.nameRU}`}
      />
      <>
        <button
          type="button"
          className={MoviesSavedButtonClassName}
          aria-label="Кнопка"
          onClick={handleSaveClick}
        />
        <div className="movies-card__info">
          <h3 className="movies-card__text">{item.nameRU}</h3>
          <p className="movies-card__duration">{item.duration}</p>
        </div>
      </>
    </article>
  );
}

export default MoviesCard;

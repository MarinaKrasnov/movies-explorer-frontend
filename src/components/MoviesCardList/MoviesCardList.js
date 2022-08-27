import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies }) {
  return (
    <section className="movies-card-list">
      {movies.map((item) => (
        <MoviesCard
          item={item}
          key={item.movieId}
          /*           onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} */
        />
      ))}
    </section>
  );
}

export default MoviesCardList;

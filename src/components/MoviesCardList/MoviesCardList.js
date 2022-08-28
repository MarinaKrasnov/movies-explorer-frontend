import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies }) {
  const showned =
    window.innerWidth < 437 ? 4 : window.innerWidth < 837 ? 7 : 11;
  const isMore =
    window.innerWidth < 437 && movies.length > 5
      ? true
      : window.innerWidth < 837 && movies.length > 8
      ? true
      : window.innerWidth > 837 && movies.length > 12
      ? true
      : false;
  return (
    <>
      <section className="movies-card-list">
        {movies
          .map((item) => <MoviesCard item={item} key={item.movieId} />)
          .slice(0, showned)}
      </section>
      <div
        className={`movies-card-list__container-more ${
          isMore ? "movies-card-list__container-more_visible" : ""
        }`}
      >
        <p className="movies-card-list__more">Ещё</p>
      </div>
    </>
  );
}

export default MoviesCardList;

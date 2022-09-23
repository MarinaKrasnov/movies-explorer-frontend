import React from "react";
import "./SearchForm.css";
import loop from "../../images/loop.svg";

function SearchForm({ setIsLoading, setMovies, movies }) {
  const submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  const handleClick = () => {
    setMovies(
      movies.filter((movie) => {
        return movie.duration < 10;
      })
    );
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <form className="search-form" onSubmit={submit}>
      <div className="search-form__container">
        <input className="search-form__input" value="Фильм"></input>
        <button type="submit" className=" search-form__submit">
          <img src={loop} className="search-form__submit-loop" alt="Loop" />
        </button>
      </div>
      <div className="search-form__checkbox">
        <label className="search-form__switch">
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            onClick={handleClick}
          />
          <span className="search-form__slider"></span>
        </label>
        <label htmlFor="checkbox" className="search-form__text">
          Короткометражки
        </label>
      </div>
    </form>
  );
}

export default SearchForm;

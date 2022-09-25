import React from "react";
import "./SearchForm.css";
import loop from "../../images/loop.svg";
import { useForm } from "../Validation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SearchForm({ onSubmit, onSwitch }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { handleChange, values, setValues } = useForm();
  const submit = (e) => {
    e.preventDefault();
    /*     setIsLoading(true); */
    if (onSubmit && values.search) {
      setValues(values.search);
      onSubmit(values.search);
      localStorage.setItem(
        `searchQuery-${currentUser._id}`,
        JSON.stringify(values.search)
      );
      /*       setTimeout(() => {
        setIsLoading(false);
      }, 3000); */
    } else alert("error");
  };
  const handleCheckboxChange = (e) => {
    const target = e.target;
    onSwitch(target.checked);
  };

  /*   const handleClick = () => {
    setShortfilmSwitch((current) => !current); */

  /*     setIsLoading(true); */
  /*     let savedMovies = movies.filter((movie) => {
      return movie.duration < 10;
    }); */
  /*     setMovies(
      movies.filter((movie) => {
        return movie.duration < 10;
      })
    );
  }; */
  /*     setTimeout(() => {
      setIsLoading(false);
    }, 3000); */

  /*   React.useEffect(() => {
    const searchResults = JSON.parse(localStorage.getItem("searchResult"));
    if (searchResults) {
      useForm.values.search = searchResults;
      return;
    }
    return;
    // eslint-disable-next-line
  }, [isLoggedIn]); */
  return (
    <form className="search-form" onSubmit={submit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          name="search"
          onChange={handleChange}
          required
        ></input>
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
            /*     onClick={handleClick} */
            onChange={handleCheckboxChange}
            /*   onChange={useForm.handleChange} */
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

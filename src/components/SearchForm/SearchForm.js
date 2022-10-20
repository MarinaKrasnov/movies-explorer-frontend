import React from "react";
import "./SearchForm.css";
import loop from "../../images/loop.svg";
import { useForm } from "../Validation";

function SearchForm({
  onSubmit,
  onSwitch,
  isShortfilmSwitchOn,
  setShortfilmSwitch,
}) {
  const { handleChange, values } = useForm();
  const submit = (e) => {
    e.preventDefault();
    if (onSubmit && values.search) {
      onSubmit(values.search);
    } else alert("error");
  };
  const handleCheckboxChange = (e) => {
    const target = e.target;
    onSwitch(target.checked);
    if (setShortfilmSwitch) {
      setShortfilmSwitch(target.checked);
    }
  };

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
            checked={isShortfilmSwitchOn}
            onChange={handleCheckboxChange}
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

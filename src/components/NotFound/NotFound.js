import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Not found</p>
      <button className="button not-found__button" onClick={history.goBack}>
        Back
      </button>
    </div>
  );
}

export default NotFound;

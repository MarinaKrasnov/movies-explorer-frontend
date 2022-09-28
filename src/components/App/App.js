import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Main from "../Main/Main.js";
import ProtectedRoute from "../ProtectedRoute.js";
import Login from "../Login/Login";
import Register from "../Register/Register";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile";
import Header from "../Header/Header.js";
import NotFound from "../NotFound/NotFound";
import Navigation from "../Navigation/Navigation.js";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi.js";
import Preloader from "../Preloader/Preloader.js";
import {
  DEFAULT_ERROR_MESSAGE,
  MAX_DURATION_SHORT_FILM,
} from "../../utils/constants";
import { NOTIFICATION_DURATION } from "../../utils/constants";

function App() {
  // State constants
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [jwt, setJWT] = React.useState(localStorage.getItem("jwt"));
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [profileMessageModifier, setProfileMessageModifier] = useState(false);
  const [savedMoviesMessage, setSavedMoviesMessage] = useState("");
  const [unauthPageMessage, setUnauthPageMessage] = useState("");
  const [popupError, setPopupError] = useState("");
  const [popupErrorStatus, setPopupErrorStatus] = useState(false);

  const location = useLocation();
  //Effects
  useEffect(() => {
    if (!!jwt && !popupErrorStatus) {
      setIsLoggedIn(true);
    }
  }, [jwt, popupErrorStatus]);
  useEffect(() => {
    if (isLoggedIn) {
      MainApi.getProfileInfo(jwt)
        .then((response) => setCurrentUser(response))
        .catch((e) => {
          showPopupError(e.message);
          setIsLoggedIn(false);
          history.push("/signin");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, isLoggedIn]);

  useEffect(() => {
    if (!!currentUser._id && !!jwt) {
      setIsLoading(true);
      if (!!localStorage.getItem(`movies-${currentUser._id}`)) {
        const moviesData = JSON.parse(
          localStorage.getItem(`movies-${currentUser._id}`)
        );
        setMovies(moviesData);
        setIsLoading(false);
      } else {
        MoviesApi.getMovies()
          .then((items) => {
            const moviesElements = items.map((item) => {
              return {
                country: item.country || "--",
                director: item.director || "--",
                duration: item.duration || 0,
                year: item.year || "2022",
                description: item.description || "--",
                image:
                  `${MoviesApi._url}${item.image.url}` ||
                  "https://i0.wp.com/dictionaryblog.cambridge.org/wp-content/uploads/2019/11/funny.jpg",
                trailerLink: item.trailerLink || "www.youtube.com",
                thumbnail:
                  `${MoviesApi._url}${item.image.formats.thumbnail.url}` ||
                  "https://i0.wp.com/dictionaryblog.cambridge.org/wp-content/uploads/2019/11/funny.jpg",
                nameRU: item.nameRU || "--",
                nameEN: item.nameEN || "--",
                movieId: item.id,
              };
            });
            setMovies(moviesElements);
            localStorage.setItem(
              `movies-${currentUser._id}`,
              JSON.stringify(moviesElements)
            );
          })
          .catch((err) => alert(err, err.message))
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, currentUser._id]);

  useEffect(() => {
    if (!!currentUser._id && !popupErrorStatus) {
      if (!!localStorage.getItem(`savedMovies-${currentUser._id}`)) {
        const moviesData = JSON.parse(
          localStorage.getItem(`savedMovies-${currentUser._id}`)
        );
        setSavedMovies(moviesData);
      } else {
        MainApi.getSavedMovies(jwt)
          .then((movies) => {
            localStorage.setItem(
              `savedMovies-${currentUser._id}`,
              JSON.stringify(movies)
            );
            setSavedMovies(movies);
            setSavedMoviesMessage("");
          })
          .catch((e) => {
            setSavedMoviesMessage(DEFAULT_ERROR_MESSAGE);
            console.log(e);
          });
        /* .finally(() => setIsLoading(false)); */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);
  function useWindowSize() {
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const filterMoviesByDuration = (movie) => {
    return movie.duration <= MAX_DURATION_SHORT_FILM;
  };
  const filter = (searchQuery, isShortfilmSwitchOn) => {
    const moviesData =
      location.pathname === "/saved-movies" ? savedMovies : movies;
    const filterMoviesByKeyword = (movie) => {
      return JSON.stringify(movie)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    };
    const filteredMoviesData = isShortfilmSwitchOn
      ? moviesData.filter(filterMoviesByKeyword).filter(filterMoviesByDuration)
      : moviesData.filter(filterMoviesByKeyword);
    return filteredMoviesData;
  };
  // Effects

  const closeByEsc = React.useCallback((e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  useEffect(() => {
    if (isPopupOpen || isInfoTooltipOpen) {
      document.addEventListener("keydown", closeByEsc);
    }
    return () => document.removeEventListener("keydown", closeByEsc);
  }, [closeByEsc, isPopupOpen, isInfoTooltipOpen]);

  const showProfileMessage = (text, modifier) => {
    setProfileMessage(text);
    setProfileMessageModifier(modifier);
    setTimeout(() => setProfileMessageModifier(""), NOTIFICATION_DURATION);
  };

  const showPopupError = (text = "Что-то пошло не так") => {
    setPopupError(text);
    setPopupErrorStatus(true);
    setTimeout(() => setPopupErrorStatus(false), NOTIFICATION_DURATION);
  };

  //Handlers

  const handlePopup = () => {
    setPopupOpen((current) => !current);
  };
  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((response) => {
        if (response) {
          console.log(response);
          handleLogin(email, password);
          setUnauthPageMessage("");
        }
      })
      .catch((e) => alert(e))
      .then((e) => {
        if (e?.message) {
          setUnauthPageMessage(e.message);
        }
      })
      .catch((err) => {
        alert(err, err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleLogin = (email, password) => {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((response) => {
        if (response.token) {
          setJWT(response.token);
          /*    setCurrentUser(response); */
          localStorage.setItem("jwt", response.token);
          setIsLoggedIn(true);
          history.push("/movies");
          setUnauthPageMessage("");
        } else {
          setMessage(false);
          setInfoTooltip(true);
        }
      })
      .catch((err) => {
        alert(err, err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const closeAllPopups = () => {
    setInfoTooltip(false);
    setPopupOpen(false);
  };

  const handleEditing = (name, email) => {
    setIsLoading(true);
    MainApi.editProfileInfo(name, email, jwt)
      .then((response) => {
        if (response) {
          setCurrentUser(response);
          setMessage(true);
          setInfoTooltip(true);
          showProfileMessage("Изменения сохранены", "success");
        } else {
          setMessage(false);
          setInfoTooltip(true);
        }
      })
      .catch((e) => showProfileMessage(e.message, "fail"))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem(`savedMovies-${currentUser._id}`);
    localStorage.removeItem(`movies-${currentUser._id}`);
    localStorage.removeItem(`searchResult-${currentUser._id}`);
    setJWT("");
    setIsLoggedIn(false);
    setSavedMovies([]);
    setMovies([]);
    setCurrentUser({});
    history.push("/");
  };
  const [width] = useWindowSize();
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <InfoTooltip message={popupError} isOpen={popupErrorStatus} />
      {isLoading ? (
        <Preloader />
      ) : (
        <Switch>
          <Route path="/signup" handleRegister={handleRegister}>
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
              message={unauthPageMessage}
              setMessage={setUnauthPageMessage}
            />
            <InfoTooltip
              onClose={closeAllPopups}
              isOpen={isInfoTooltipOpen}
              message={message}
            />
          </Route>
          <Route path="/signin" handleLogin={handleLogin}>
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
              message={unauthPageMessage}
              setMessage={setUnauthPageMessage}
            />
            <InfoTooltip
              onClose={closeAllPopups}
              isOpen={isInfoTooltipOpen}
              message={message}
            />
          </Route>
          <Route exact path="/" isLoggedIn={isLoggedIn}>
            <Header
              isLoggedIn={isLoggedIn}
              className="header_type_main"
              setPopupOpen={handlePopup}
              isPopupOpen={isPopupOpen}
              setIsPopup={setPopupOpen}
              screenSize={width}
            />
            <Navigation isPopupOpen={isPopupOpen} onClose={closeAllPopups} />
            <Main />
          </Route>
          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Header
              isLoggedIn={isLoggedIn}
              setPopupOpen={handlePopup}
              isPopupOpen={isPopupOpen}
              screenSize={width}
            />
            <Movies
              movies={movies}
              screenSize={width}
              jwt={jwt}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
              setMovies={setMovies}
              filter={filter}
              filterMoviesByDuration={filterMoviesByDuration}
              cardErrorHandler={showPopupError}
            />
            <Navigation isPopupOpen={isPopupOpen} onClose={closeAllPopups} />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <Header
              isLoggedIn={isLoggedIn}
              setPopupOpen={handlePopup}
              isPopupOpen={isPopupOpen}
              screenSize={width}
            />
            <SavedMovies
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              screenSize={width}
              jwt={jwt}
              setSavedMovies={setSavedMovies}
              message={savedMoviesMessage}
              cardErrorHandler={showPopupError}
              /* getSavedMoviesData={getSavedMoviesData} */
              filter={filter}
              filterMoviesByDuration={filterMoviesByDuration}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Header
              isLoggedIn={isLoggedIn}
              setPopupOpen={handlePopup}
              isPopupOpen={isPopupOpen}
              screenSize={width}
            />
            <Profile
              onEdit={handleEditing}
              signOut={handleSignOut}
              isLoading={isLoading}
              message={profileMessage}
              messageModifier={profileMessageModifier}
            />
            <Navigation isPopupOpen={isPopupOpen} onClose={closeAllPopups} />
          </ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;

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

function App() {
  // State constants
  const [jwt, setJWT] = React.useState(localStorage.getItem("jwt"));
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const location = useLocation();
  const checkToken = React.useCallback(() => {
    /* const jwt = localStorage.getItem(`jwt-${currentUser._id}`); */
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.token) {
            setJWT(res.token);
            setIsLoggedIn(true);
            setCurrentUser(res);
            history.push("/movies");
          }
          if (res.message) {
            handleSignOut();
          }
        })
        .catch((err) => alert(err, err.message))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);
  const getSavedMoviesData = async () => {
    let savedMoviesData = [];
    if (localStorage.getItem(`savedMovies-${currentUser._id}`)) {
      let savedMoviesData = JSON.parse(
        localStorage.getItem(`savedMovies-${currentUser._id}`)
      );
      setSavedMovies(savedMoviesData);
    }
    if (
      savedMoviesData === [] /* ||
      !savedMovies.some((movie) => movie.owner === currentUser._id) */
    ) {
      MainApi.getSavedMovies(jwt)
        .then((savedMoviesData) => {
          if (savedMoviesData) {
            setSavedMovies(savedMoviesData);
            localStorage.setItem(
              `savedMovies-${currentUser._id}`,
              JSON.stringify(savedMoviesData)
            );
            return savedMoviesData;
          } else {
            return setSavedMovies([]);
          }
        })
        .catch((err) => alert(err, err.message))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      return savedMovies;
    }
  };

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
    return movie.duration <= 40;
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
  useEffect(() => {
    setIsLoading(true);
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    if (isLoggedIn && jwt) {
      setIsLoading(true);
      if (!!localStorage.getItem(`movies-${currentUser._id}`)) {
        const moviesData = JSON.parse(
          localStorage.getItem(`movies-${currentUser._id}`)
        );
        setMovies(moviesData);
      } else {
        MoviesApi.getMovies()
          .then((items) => {
            const moviesElements = items.map((item) => {
              return {
                country: item.country || "-",
                director: item.director || "-",
                duration: item.duration || 0,
                year: item.year || "2022",
                description: item.description || "-",
                image: `${MoviesApi._url}${item.image.url}`,
                trailerLink: item.trailerLink,
                thumbnail: `${MoviesApi._url}${item.image.formats.thumbnail.url}`,
                nameRU: item.nameRU,
                nameEN: item.nameEN,
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
  }, [isLoggedIn]);
  useEffect(() => {
    if (isLoggedIn && jwt) {
      setIsLoading(true);
      getSavedMoviesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, jwt]);

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

  //Handlers
  const handlePopup = () => {
    setPopupOpen((current) => !current);
  };
  const handleRegister = (name, password, email) => {
    setIsLoading(true);
    auth
      .register(name, password, email)
      .then((response) => {
        if (response) {
          setMessage(true);
          setInfoTooltip(true);
          setJWT(response.token);
          localStorage.setItem("jwt", response.token);
          setIsLoggedIn(true);
          history.push("/movies");
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
  const handleLogin = (email, password) => {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((response) => {
        if (response.token) {
          setJWT(response.token);
          setCurrentUser(response);
          localStorage.setItem("jwt", response.token);
          setIsLoggedIn(true);
          history.push("/movies");
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
  const handleSignOut = () => {
    localStorage.removeItem(`jwt-${currentUser._id}`);
    localStorage.removeItem(`savedMovies-${currentUser._id}`);
    localStorage.removeItem(`movies-${currentUser._id}`);
    localStorage.removeItem(`switch-${currentUser._id}`);
    localStorage.removeItem(`searchQuery-${currentUser._id}`);
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
      {isLoading ? (
        <Preloader />
      ) : (
        <Switch>
          <Route path="/signup" handleRegister={handleRegister}>
            <Register onRegister={handleRegister} />
            <InfoTooltip
              onClose={closeAllPopups}
              isOpen={isInfoTooltipOpen}
              message={message}
            />
          </Route>
          <Route path="/signin" handleLogin={handleLogin}>
            <Login onLogin={handleLogin} />
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
              getSavedMoviesData={getSavedMoviesData}
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
            <Profile onEdit={handleEditing} signOut={handleSignOut} />
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

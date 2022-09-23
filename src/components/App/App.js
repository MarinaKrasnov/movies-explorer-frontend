import React from "react";
import Main from "../Main/Main.js";
/* import api from "../../utils/api"; */
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
/* import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup.js' */
import Login from "../Login/Login";
import { Route, Switch } from "react-router-dom";
import Register from "../Register/Register";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
/* import ProtectedRoute from './ProtectedRoute' */
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile";
import Header from "../Header/Header.js";
import NotFound from "../NotFound/NotFound";
import { movies } from "../../utils/db";
import Navigation from "../Navigation/Navigation.js";
import api from "../../utils/api";

function App() {
  // State constants
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  /*   const [movies, setMovies] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([]) */
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  React.useEffect(() => {
    setCurrentUser({ name: "Виталий", email: "pochta@yandex.ru" });
    setIsLoggedIn(true);
  }, []);
  const handlePopup = () => {
    setPopupOpen((current) => !current);
  };
  /*   const [movies, setMovies] = React.useState({ movies: movies }); */
  /*   const [jwt, setJWT] = React.useState(localStorage.getItem('jwt')); */
  // Effects
  /*  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getMovies(jwt),api.getSavedMovies(jwt), api.getProfileInfo(jwt)])
        .then(([movies, savedmovies, userData]) => {
          setMovies(movies)
          setSavedMovies(savedmovies)
          setCurrentUser(userData)
        })
        .catch(err => {
          console.log(`Request for data from server is failed.${err}`)
        })
    }
  }, [isLoggedIn, jwt])
  React.useEffect(() => {
    const checkToken = () => {
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        auth.checkToken(jwt).then(() => {
          setIsLoggedIn(true)
          history.push('/')
        })
      }
    }
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])
  */ //Handlers

  /*   function handleCardDelete (movie) {
    api
      .deleteCard(movie._id,jwt)
      .then(() => {
        setMovies(movies =>
          movies.filter(item => {
            return item._id !== movie._id
          })
        )
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  } */

  const handleRegister = (name, password, email) => {
    auth
      .register(name, password, email)
      .then((response) => {
        if (response) {
          setMessage(true);
          setInfoTooltip(true);
          React.setTimeOut(() => {
            history.push("/signin");
          }, 3000);
        } else {
          setMessage(false);
          setInfoTooltip(true);
        }
      })
      .then((res) => {
        if (!res.email) {
          setMessage(false);
          setInfoTooltip(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogin = (email, password) => {
    auth.login(email, password).then((response) => {
      if (response.token) {
        /*         setJWT(response.token) */
        localStorage.setItem("jwt", response.token);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        setMessage(false);
        setInfoTooltip(true);
      }
    });
  };
  const closeAllPopups = () => {
    setInfoTooltip(false);
    setPopupOpen(false);
  };
  const handleEditing = (name, email) => {
    api
      .editProfileInfo(name, email)
      .then((response) => {
        if (response) {
          setMessage(true);
          setInfoTooltip(true);
        } else {
          setMessage(false);
          setInfoTooltip(true);
        }
      })
      .then((res) => {
        if (!res.email) {
          setMessage(false);
          setInfoTooltip(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/signup" handleRegister={handleRegister}>
          <Register />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            message={message}
          />
        </Route>
        <Route path="/signin" handleLogin={handleLogin}>
          <Login />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            message={message}
          />
        </Route>
        <Route exact path="/">
          <Header
            isLoggedIn={isLoggedIn}
            className="header_type_main"
            setPopupOpen={handlePopup}
            isPopupOpen={isPopupOpen}
            setIsPopup={setPopupOpen}
          />
          <Navigation isPopupOpen={isPopupOpen} onClose={handlePopup} />
          <Main />
        </Route>
        <Route path="/movie">
          <Navigation isPopupOpen={true} onClose={handlePopup} />
        </Route>
        <Route path="/movies">
          <Header
            isLoggedIn={isLoggedIn}
            setPopupOpen={handlePopup}
            isPopupOpen={isPopupOpen}
          />
          <Movies movies={movies} /* setMovies={setMovies} */ />
          <Navigation isPopupOpen={isPopupOpen} onClose={handlePopup} />
        </Route>
        <Route path="/saved-movies">
          <Header
            isLoggedIn={isLoggedIn}
            setPopupOpen={handlePopup}
            isPopupOpen={isPopupOpen}
          />
          <SavedMovies isLoggedIn={isLoggedIn} savedMovies={movies} />
        </Route>
        <Route path="/profile">
          <Header
            isLoggedIn={isLoggedIn}
            setPopupOpen={handlePopup}
            isPopupOpen={isPopupOpen}
          />
          <Profile onEdit={handleEditing} signOut={handleSignOut} />
          <Navigation isPopupOpen={isPopupOpen} onClose={handlePopup} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
        {/*   <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
          <Header className={'header_type_loggedin'}>
            <div className='header__email-container'>
              <p className='header__email'>{email}</p>
              <Link
                to='signin'
                className='header__link link header__link_type_loggedin'
                onClick={handleSignOut}
              >
                Выйти
              </Link>
            </div>
          </Header>
          <Main/>
          <Footer />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleEditProfileChange}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleEditAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name={'ausure'}
            title='Вы уверены?'
            onClose={closeAllPopups}
          >
            <input type='hidden' name='id' defaultValue='' />

            <button
              type='submit'
              className='popup__submit popup__submit_size_s'
              aria-label='Кнопка согласия'
            >
              Да
            </button>
          </PopupWithForm>
        </ProtectedRoute>
        <Route path='/signup'>
          <Header className={'header_type_login'}>
            <Link to='signin' className='link'>
              Войти
            </Link>
          </Header>
          <div className='form__container'>
            <Register onRegister={handleRegister} />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            message={message}
            isOpen={isInfoTooltipOpen}
          />
        </Route>
        <Route path='/signin'>
          <Header className={'header_type_login'}>
            <Link to='signup' className='header__link link'>
              Регистрация
            </Link>
          </Header>
          <div className='form__container'>
            <LogIn onLogin={handleLogin} />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            message={message}
            isOpen={isInfoTooltipOpen}
          />
        </Route> 
 */}
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;

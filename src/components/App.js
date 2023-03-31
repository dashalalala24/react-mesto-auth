import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletion from './ConfirmDeletion';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import * as auth from '../utils/auth';

import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
  });
  const [errorMesage, setErrorMesage] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState({
    icon: '',
    message: '',
  });

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletionPopupOpen, setConfirmDeletionPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [removedCard, setRemovedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((userData) => {
          setLoggedIn(true);
          setUserData({ email: userData.email });
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => console.log(error));

      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards.data);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((userData) => {
        setUserData({ email: userData.email });
        setRegistrationStatus({
          icon: successIcon,
          message: 'Вы успешно зарегистрировались!',
        });
      })
      .then(() => {
        navigate('/signin', { replace: true });
        setErrorMesage('');
      })
      .catch((error) => {
        setRegistrationStatus({
          icon: failIcon,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setErrorMesage(`Ой, всё сломалось :( ${error}`);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
        setLoggedIn(true);
        navigate('/', { replace: true });
        setUserData({
          email: email,
        });
        setErrorMesage('');
      })
      .catch((error) => {
        setErrorMesage(`Ой, всё сломалось :( ${error}`);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/signin', { replace: true });
    setIsBurgerActive(false);
    setLoggedIn(false);
    setUserData('');
  }

  function handleOpenHeader() {
    setIsBurgerActive(!isBurgerActive);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleConfirmDeletionClick(card) {
    setConfirmDeletionPopupOpen(true);
    setRemovedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletionPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
    setRemovedCard(null);
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((element) => element._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((element) => (element._id === card._id ? newCard : element)));
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setProfilePic(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          userData={userData}
          onSignOut={signOut}
          onOpenHeader={handleOpenHeader}
          isBurgerActive={isBurgerActive}
        />

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDeletionClick}
              />
            }></Route>

          <Route
            path='/signin'
            element={
              <Login
                handleLogin={handleLogin}
                errorMesage={errorMesage}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                handleRegister={handleRegister}
                errorMesage={errorMesage}
              />
            }
          />
          <Route
            path='*'
            element={loggedIn ? <Main /> : <Register />}
          />
        </Routes>

        <Footer />

        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          message={registrationStatus.message}
          statusIcon={registrationStatus.icon}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <ConfirmDeletion
          isOpen={isConfirmDeletionPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onCardDelete={handleCardDelete}
          card={removedCard}
          onLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

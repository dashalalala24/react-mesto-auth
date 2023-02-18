import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ userData }) {
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={headerLogo} alt="Логотип сервиса Mesto" />
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{userData.email}</p>
              <button className="header__logout" onClick={logOut}>
                Выйти
              </button>
            </div>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />

        <Route
          path="sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;

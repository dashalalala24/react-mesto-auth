import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ userData, onSignOut }) {
  return (
    <header className='header'>
      <Link to='/'>
        <img
          className='logo'
          src={headerLogo}
          alt='Логотип сервиса Mesto'
        />
      </Link>
      <Routes>
        <Route
          path='/'
          element={
            <div className='header__container'>
              <p className='header__email'>{userData.email}</p>
              <button
                className='header__logout'
                onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        />

        <Route
          path='/signin'
          element={
            <Link
              to='/signup'
              className='header__link'>
              Регистрация
            </Link>
          }
        />

        <Route
          path='signup'
          element={
            <Link
              to='/signin'
              className='header__link'>
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;

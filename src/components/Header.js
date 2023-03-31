import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ userData, onSignOut, onOpenHeader, isBurgerActive }) {
  return (
    <header className={`header ${isBurgerActive ? 'header_active' : ''}`}>
      <Link to='/'>
        <img
          className='logo'
          src={headerLogo}
          alt='Логотип сервиса Mesto'
        />
      </Link>
      <Routes>
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
        <Route
          path='/'
          element={
            <>
              <div
                className={`header__container ${isBurgerActive ? 'header__container_active' : ''}`}>
                <p className='header__email'>{userData.email}</p>
                <button
                  className='header__logout'
                  onClick={onSignOut}>
                  Выйти
                </button>
              </div>
              <div
                className={`header__burger ${isBurgerActive ? 'header__burger_active' : ''}`}
                onClick={onOpenHeader}>
                <span className='header__burger-line'></span>
                <span className='header__burger-line'></span>
                <span className='header__burger-line'></span>
              </div>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;

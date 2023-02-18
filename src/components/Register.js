import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister, errorMesage }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    let { email, password } = userData;
    handleRegister(email, password);
  }

  return (
    <section className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form
        className="auth__form"
        name="auth"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="auth__inputs">
          <input
            className="auth__input auth__input_type_email"
            id="email-input"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
            value={userData.email || ''}
            onChange={handleChange}
          />
          <span
            id="email-input-error"
            className="auth__error email-input-error"
          >
            {errorMesage}
          </span>
          <input
            className="auth__input auth__input_type_password"
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="off"
            required
            value={userData.password || ''}
            onChange={handleChange}
          />
          <span
            id="password-input-error"
            className="auth__error password-input-error"
          >
            {errorMesage}
          </span>
        </div>
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;

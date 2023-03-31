import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Register({ handleRegister }) {
  const initialValues = {
    email: '',
    password: '',
  };

  const { values, errors, isValid, handleChange, setIsValid, resetForm } =
    useFormAndValidation(initialValues);

  useEffect(() => {
    setIsValid(false);
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    let { email, password } = values;
    handleRegister(email, password);
    resetForm();
  }

  // const [userData, setUserData] = useState({
  //   email: '',
  //   password: '',
  // });

  // function handleChange(evt) {
  //   const { name, value } = evt.target;

  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // }

  return (
    <section className='auth'>
      <h3 className='auth__title'>Регистрация</h3>
      <form
        className='auth__form'
        name='auth'
        onSubmit={handleSubmit}>
        <div className='auth__inputs'>
          <input
            className='auth__input auth__input_type_email'
            id='email-input'
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='off'
            required
            value={values.email || ''}
            onChange={handleChange}
          />
          <span
            id='email-input-error'
            className='auth__error email-input-error'>
            {errors.email}
          </span>
          <input
            className='auth__input auth__input_type_password'
            id='password-input'
            type='password'
            name='password'
            placeholder='Пароль'
            autoComplete='off'
            required
            value={values.password || ''}
            onChange={handleChange}
          />
          <span
            id='password-input-error'
            className='auth__error password-input-error'>
            {errors.password}
          </span>
        </div>
        <button
          className={`auth__button ${!isValid ? 'auth__button_disabled' : ''}`}
          type='submit'
          disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
      <Link
        to='/signin'
        className='auth__link'>
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;

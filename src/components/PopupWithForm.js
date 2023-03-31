import React from 'react';

function PopupWithForm({
  name,
  title,
  formName,
  children,
  buttonText,
  isOpen,
  onClose,
  onOverlayClick,
  onSubmit,
  isValid,
  // onLoading,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={onOverlayClick}>
      <div className='popup__container'>
        <button
          className='popup__close-icon'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}></button>
        <h3 className='popup__title'>{title}</h3>
        <form
          className='popup__form'
          method='get'
          name={formName}
          onSubmit={onSubmit}
          // onLoading={onLoading}
          noValidate>
          {children}
          <button
            className={`popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
            type='submit'
            disabled={!isValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

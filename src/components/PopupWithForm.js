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
          noValidate>
          {children}
          <button
            className='popup__button'
            type='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

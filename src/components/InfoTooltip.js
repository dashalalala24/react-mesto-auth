import React from 'react';
function InfoToolTip({ isOpen, onClose, onOverlayClick, statusIcon, message }) {
  return (
    <div
      className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}
      onClick={onOverlayClick}
      onClose={onClose}>
      <div className='popup__container popup__container_type_tooltip'>
        <button
          className='popup__close-icon'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}></button>
        <img
          className='popup__image popup__image_type_tooltip'
          alt='Статус регистрации'
          src={statusIcon}
        />
        <h2 className='popup__title popup__title_type_tooltip'>{message}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;

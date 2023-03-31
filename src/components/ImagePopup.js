import React from 'react';

function ImagePopup({ card, onOverlayClick, onClose }) {
  return (
    <div
      onClick={onOverlayClick}
      className={`popup popup_type_full-image ${card ? 'popup_opened' : ''}`}>
      <div className='popup__container popup__container_type_full-image'>
        <button
          className='popup__close-icon'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}></button>
        <figure className='popup__figure'>
          <img
            className='popup__image'
            alt='Фотография'
            src={card?.link}
          />
          <figcaption className='popup__caption'>{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

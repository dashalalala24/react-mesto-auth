import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      formName="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      buttonText={onLoading ? `Создание...` : `Создать`}
      children={
        <>
          <input
            className="popup__input popup__input_type_card-name"
            id="cardname-input"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span
            id="cardname-input-error"
            className="popup__error cardname-input-error"
          ></span>
          <input
            className="popup__input popup__input_type_card-link"
            id="link-input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            autoComplete="off"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span
            id="link-input-error"
            className="popup__error link-input-error"
          ></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;

import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      formName="user"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      children={
        <>
          <input
            className="popup__input popup__input_type_username"
            id="username-input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            autoComplete="off"
            required
            value={name || ''}
            onChange={handleNameChange}
          />
          <span
            id="username-input-error"
            className="popup__error username-input-error"
          ></span>
          <input
            className="popup__input popup__input_type_occupation"
            id="occupation-input"
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            autoComplete="off"
            required
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span
            id="occupation-input-error"
            className="popup__error occupation-input-error"
          ></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;

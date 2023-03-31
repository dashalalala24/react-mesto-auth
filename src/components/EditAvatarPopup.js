import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onOverlayClick, onUpdateAvatar, onLoading }) {
  const profilePicRef = useRef(null);

  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({});

  useEffect(() => {
    resetForm();
    profilePicRef.current.value = null;
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: profilePicRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='edit-profilepic'
      title='Обновить аватар'
      formName='profilepic'
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      isValid={isValid}
      onLoading={onLoading}
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      children={
        <>
          <input
            className='popup__input popup__input_type_profilepic-link'
            id='profilepic-link-input'
            type='url'
            name='profilepic'
            placeholder='Ссылка на фотографию'
            autoComplete='off'
            required
            ref={profilePicRef}
            value={values.profilepic || ''}
            onChange={handleChange}
          />
          <span
            id='profilepic-link-input-error'
            className='popup__error profilepic-link-input-error'>
            {errors.profilepic}
          </span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;

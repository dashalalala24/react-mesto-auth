import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser, onLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValues, resetForm, setIsValid } =
    useFormAndValidation({});

  useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');

  // useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser]);

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function handleDescriptionChange(e) {
  //   setDescription(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   onUpdateUser({
  //     name,
  //     about: description,
  //   });
  // }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      formName='user'
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      isValid={isValid && values.name && values.about}
      onLoading={onLoading}
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      children={
        <>
          <input
            className='popup__input popup__input_type_username'
            id='username-input'
            type='text'
            name='name'
            placeholder='Имя'
            minLength='2'
            maxLength='40'
            autoComplete='off'
            required
            value={values.name || ''}
            onChange={handleChange}
          />
          <span
            id='username-input-error'
            className='popup__error username-input-error'>
            {errors.name}
          </span>
          <input
            className='popup__input popup__input_type_occupation'
            id='occupation-input'
            type='text'
            name='about'
            placeholder='О себе'
            minLength='2'
            maxLength='200'
            autoComplete='off'
            required
            value={values.about || ''}
            onChange={handleChange}
          />
          <span
            id='occupation-input-error'
            className='popup__error occupation-input-error'>
            {errors.about}
          </span>
        </>
      }
    />
  );
}

export default EditProfilePopup;

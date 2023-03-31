import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onOverlayClick, onAddPlace, onLoading }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({});

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  // const [name, setName] = useState('');
  // const [link, setLink] = useState('');

  // useEffect(() => {
  //   setName('');
  //   setLink('');
  // }, [isOpen]);

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function handleLinkChange(e) {
  //   setLink(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   onAddPlace({
  //     name,
  //     link,
  //   });
  // }

  return (
    <PopupWithForm
      name='new-card'
      title='Новое место'
      formName='card'
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
      buttonText={onLoading ? `Создание...` : `Создать`}
      children={
        <>
          <input
            className='popup__input popup__input_type_card-name'
            id='cardname-input'
            type='text'
            name='name'
            placeholder='Название'
            minLength='2'
            maxLength='30'
            autoComplete='off'
            required
            value={values.name || ''}
            onChange={handleChange}
          />
          <span
            id='cardname-input-error'
            className='popup__error cardname-input-error'>
            {errors.name}
          </span>
          <input
            className='popup__input popup__input_type_card-link'
            id='link-input'
            type='url'
            name='link'
            placeholder='Ссылка на картинку'
            autoComplete='off'
            required
            value={values.link || ''}
            onChange={handleChange}
          />
          <span
            id='link-input-error'
            className='popup__error cardname-input-error'>
            {errors.link}
          </span>
        </>
      }
    />
  );
}

export default AddPlacePopup;

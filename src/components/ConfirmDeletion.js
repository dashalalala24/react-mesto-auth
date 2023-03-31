import PopupWithForm from './PopupWithForm';

function ConfirmDeletion({ isOpen, onClose, onOverlayClick, onCardDelete, card, onLoading }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name='confirm-deletion'
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      title='Вы уверены?'
      formName='delete'
      onLoading={onLoading}
      buttonText={onLoading ? `Удаление...` : `Удалить`}
      isValid={true}
    />
  );
}

export default ConfirmDeletion;

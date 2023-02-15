import PopupWithForm from './PopupWithForm';

function ConfirmDeletion({ isOpen, onClose, onCardDelete, card, onLoading }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirm-deletion"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      formName="delete"
      onLoading={onLoading}
      buttonText={onLoading ? `Удаление...` : `Удалить`}
    />
  );
}

export default ConfirmDeletion;

import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = (card.owner._id || card.owner) === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards__like ${
    isLiked ? 'cards__like_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className='cards__item'>
      <img
        className='cards__image'
        alt={`Фотография: ${card.name}`}
        src={card.link}
        onClick={handleClick}
      />

      {isOwn && (
        <button
          className='cards__delete-button'
          type='button'
          aria-label='Удалить карточку'
          onClick={handleDeleteClick}
        />
      )}

      <div className='cards__element'>
        <h2 className='cards__name'>{card.name}</h2>
        <div className='cards__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Нравится'
            onClick={handleCardLike}></button>
          <p className='cards__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;

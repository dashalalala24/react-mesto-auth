import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__info'>
          <div
            className='profile__pic-container'
            onClick={onEditAvatar}>
            <img
              className='profile__pic'
              alt='Аватар'
              src={currentUser.avatar}
            />
          </div>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <p className='profile__occupation'>{currentUser.about}</p>
          <button
            className='profile__edit-button'
            type='button'
            aria-label='Редактировать профиль'
            onClick={onEditProfile}></button>
        </div>
        <button
          className='profile__add-button'
          type='button'
          aria-label='Добавить фото'
          onClick={onAddPlace}></button>
      </section>

      <section
        className='cards'
        aria-label='Карточки с фотографиями'>
        {cards
          .slice()
          .reverse()
          .map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  );
}

export default Main;

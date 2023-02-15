class Api {
  constructor(data) {
    this._serverURL = data.serverURL;
    this._headers = data.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._serverURL}/cards`, {
      headers: this._headers,
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._serverURL}/users/me`, {
      headers: this._headers,
    }).then(this._checkRes);
  }

  setUserInfo(data) {
    return fetch(`${this._serverURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkRes);
  }

  setProfilePic(data) {
    return fetch(`${this._serverURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRes);
  }

  addNewCard(data) {
    return fetch(`${this._serverURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }

  // putLike(cardId) {
  //   return fetch(`${this._serverURL}/cards/${cardId}/likes`, {
  //     method: 'PUT',
  //     headers: this._headers,
  //   }).then(this._checkRes);
  // }

  // removeLike(cardId) {
  //   return fetch(`${this._serverURL}/cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(this._checkRes);
  // }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._serverURL}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._serverURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRes);
  }
}

const apiConfig = {
  serverURL: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '9732efc5-811e-490a-92fd-fca287deba43',
    'Content-Type': 'application/json',
  },
};

const api = new Api(apiConfig);

export default api;

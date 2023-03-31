class Api {
  constructor(data) {
    this._serverURL = data.serverURL;
    this._headers = data.headers;
    this._credentials = data.credentials;
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
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._serverURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  setUserInfo(data) {
    return fetch(`${this._serverURL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkRes);
  }

  setProfilePic(data) {
    return fetch(`${this._serverURL}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRes);
  }

  addNewCard(data) {
    return fetch(`${this._serverURL}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._serverURL}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._serverURL}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }
}

const apiConfig = {
  serverURL: 'https://api.mesto.dashalalala24.nomoredomains.work',
};

const api = new Api(apiConfig);

export default api;

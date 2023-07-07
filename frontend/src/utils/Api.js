class Api {
  constructor({headers, url}) {
    this._headers = headers;
    this._url = url
  }

_checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//********Загрузка карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      // headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //********Информация о пользователе с сервера */
  getUserInfo(){
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      // headers: this._headers,
    })
    .then(this._checkResponse);
  }

   //********Редактирование профиля */
  setUserInfo(data){
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      // headers: this._headers,
      body: JSON.stringify({name:data.name,
        about:data.about})
      })
      .then(this._checkResponse);
    };

    changeAvatar(avatar) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      // headers: this._headers,
        body: JSON.stringify(avatar)
        })
        .then(this._checkResponse);
      };

  addNewCard(data){
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      // headers: this._headers,
      body: JSON.stringify({name:data.name, link:data.link})
      })
      .then(this._checkResponse);
    };

    deleteCard(cardId){
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      // headers: this._headers,
      })
      .then(this._checkResponse);
    }

    //********Постановка лайка */
    addLike(cardId){
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      // headers: this._headers,
      })
      .then(this._checkResponse);
    }

    //********Снятие лайка */
    deleteLike(cardId){
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      // headers: this._headers,
      })
      .then(this._checkResponse);
    }

    toggleLikes(cardId, isLiked){
      if (isLiked){
        return this.deleteLike(cardId)
      }
      else{return this.addLike(cardId)}
    }
  }

  const api = new Api({
    url:'https://aniram.nomoredomains.work',
    // url: "http://localhost:3000",
    // headers: {
    //   authorization: "4c8fe4ba-ddf5-4cbd-b158-fff86875ab55",
    //   "Content-Type": "application/json",
    // },
  });

  export default api;
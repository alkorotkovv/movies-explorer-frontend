//Класс для формирования запросов к серверу
class MainApi {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
  };
  
  //Метод реакция на результат запроса
  _checkResult(res) {
    //console.log(res)
    if (res.ok)
        return res.json()
      else
        return res.json();
        //return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  //Метод регистрации пользователя
  registerUser(name, email, password) {
    return fetch(this._baseUrl + '/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      password: `${password}`,
      email: `${email}`
    })
    })
    .then(res => this._checkResult(res));
  };

  //Метод логина пользователя
  loginUser(email, password) {
    return fetch(this._baseUrl + '/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`
    })
    })
    .then(res => this._checkResult(res));
  }; 

  //Метод проверки токена пользователя
  getUserByToken(token) {
    return fetch(this._baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
    })
    .then(res => this._checkResult(res));
  }; 

  //Метод изменения данных пользователя
  setUserInfo(name, email) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод получения инициализируемых карточек
  getSavedMovies() {
    return fetch(this._baseUrl + '/movies', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };







  

  

  

  //Метод добавления новой карточки
  addCard(cardData) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${cardData.place}`,
        link: `${cardData.url}`
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод удаления карточки
  deleteCard(cardData) {
    return fetch(this._baseUrl + '/cards/' + cardData._id, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };

  //Метод установки/снятия лайка
  toggleLikeCard(cardData, isLiked) {
    let method = isLiked ? 'DELETE':'PUT';
    return fetch(this._baseUrl + '/cards/' + cardData._id + '/likes', {
      method: method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };

  //Метод установки аватара пользователя
  setUserAvatar(avatarData) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatarData.avatar}`
      })
    })
    .then(res => this._checkResult(res))
  };



}


const api = new MainApi({
  baseUrl: 'https://movies.alkorotkovv.nomoredomains.club'
});

export default api;
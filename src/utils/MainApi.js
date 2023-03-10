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

  //Метод получения фильм со своего бэкенда
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

  //Метод добавления нового фильма
  saveMovie(data) {
    return fetch(this._baseUrl + '/movies', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieId: `${data.movieId}`,
        country: `${data.country}`,
        description: `${data.description}`,
        director: `${data.director}`,
        duration: `${data.duration}`,
        image: `${data.image}`,
        thumbnail: `${data.thumbnail}`,
        trailerLink: `${data.trailerLink}`,
        nameEN: `${data.nameEN}`,
        nameRU: `${data.nameRU}`,
        year: `${data.year}`,
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод удаления карточки
  deleteMovie(id) {
    return fetch(this._baseUrl + '/movies/' + id, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };


}


const api = new MainApi({
  baseUrl: 'https://api.movies.alkorotkovv.nomoredomains.club'
});

export default api;
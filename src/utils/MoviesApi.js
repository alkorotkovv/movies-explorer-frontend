//Класс для формирования запросов к серверу
class MoviesApi {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
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

  //Метод получения инициализируемых карточек
  getFilms() {
    return fetch(this._baseUrl + '/beatfilm-movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkResult(res))
  };

}


const apiMovies = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co'
});

export default apiMovies;
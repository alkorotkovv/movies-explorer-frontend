import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  //console.log ("props in cardlist")
  //console.log (props)
  let block;
  const location = useLocation().pathname;

  const [windowSize, setWindowsSize] = React.useState(window.screen.width);
  const [cardsCount, setCardsCount] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [clicks, setClicks] = React.useState(0);
  const [addedCount, setAddedCount] = React.useState(0);
  

  //Добавление слушателя при монтировании
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  //Функция обработчик изменения ширины окна
  function handleResize() {
    setWindowsSize(window.screen.width);
  }

  //При повторных запросах на поиск фильма применяем стандартные настройки - количество отображаемых карточек = по умолчанию (сбрасывается)
  React.useEffect(() => {
    setInitialSettings();
  }, [props.cards])

  React.useEffect(() => {
    //console.log("че то поменялось в массиве карт или количестве")
    //console.log(cardsCount)
    //console.log(cards)
    if (window.screen.width > 1300) {
      setCards(props.cards.slice(0, cardsCount - cardsCount % 3))
    }
    else if (window.screen.width > 768) {
      setCards(props.cards.slice(0, cardsCount - cardsCount % 2))
    }
    else {
      setCards(props.cards.slice(0, cardsCount))
    }
  }, [cardsCount, props.cards])

  
  
  

  function setInitialSettings() { 
    console.log("применяем стд настройки")
    if (window.screen.width > 1300) {
      setCardsCount(12);
      setCards(props.cards.slice(0, 12))
      //setNeedShowCount(12)
    }
    else if (window.screen.width > 768) {
      setCardsCount(8);
      setCards(props.cards.slice(0, 8))
      //setNeedShowCount(8)
    }
    else {
      setCardsCount(5);
      setCards(props.cards.slice(0, 5))
      //setNeedShowCount(5)
    }    
  }

  //Функция обработчик клика на кнопку "Ещё"
  function handleMoreClick() {    
    console.log("кликнули")
    console.log(cards)
    console.log(cardsCount)

    if (window.innerWidth > 1300) {
      //setNeedShowCount(cardsCount + 3)
      setCardsCount(cardsCount + (3 - cardsCount%3))
      setAddedCount(3 - cardsCount % 3)
    }
    else if (window.innerWidth > 768) {
      //setNeedShowCount(cardsCount + 2)
      setCardsCount(cardsCount + (2 - cardsCount%2))
      setAddedCount(2 - cardsCount % 2)
    }
    else {
      //setNeedShowCount(cardsCount + 1)
      setCardsCount(cardsCount + 1)
      setAddedCount(1)
    }
    setClicks(clicks + 1);
  }



  
  if (!props.isShort) {
    block = 
      cards.map((element, index) => 
        <MoviesCard 
          key = {location === "/movies"? element.id : element.movieId}
          movieId = {location === "/movies"? element.id : element.movieId}
          country = {element.country}
          created_at = {element.created_at}
          description = {element.description}
          director = {element.director}
          duration = {element.duration}
          image = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          thumbnail = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          nameEN = {element.nameEN}
          nameRU = {element.nameRU}
          trailerLink = {element.trailerLink}
          updated_at = {element.updated_at}
          year = {element.year}

          moviesSavedList={props.moviesSavedList}
          //getSavedFilms = {props.getSavedFilms}
          //isLiked={false}
          onLike={props.onLike}
          onUnlike={props.onUnlike}
        />
      )
    }
  else {
    block = 
      props.cards.filter(element => element.duration < 40).map((element, index) =>
        <MoviesCard 
          key = {location === "/movies"? element.id : element.movieId}
          movieId = {location === "/movies"? element.id : element.movieId}
          country = {element.country}
          created_at = {element.created_at}
          description = {element.description}
          director = {element.director}
          duration = {element.duration}
          image = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          thumbnail = {location === "/movies"? "https://api.nomoreparties.co" + element.image.url : element.image}
          nameEN = {element.nameEN}
          nameRU = {element.nameRU}
          trailerLink = {element.trailerLink}
          updated_at = {element.updated_at}
          year = {element.year}

          moviesSavedList={props.moviesSavedList}
          //getSavedFilms = {props.getSavedFilms}
          //isLiked={true}
          onLike={props.onLike}
          onUnlike={props.onUnlike}
        />
      )
    }

  return (
    <>
    <ul className="card-list">
      { 
        block
      }
    </ul>
    <button className={"movies__button-more" + (cardsCount >= props.cards.length? " movies__button-more_unvisible" : "")} type="button" onClick={handleMoreClick} >Ещё</button>
    </>
  );
}

export default MoviesCardList;

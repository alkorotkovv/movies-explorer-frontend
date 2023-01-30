import React from 'react';
import RenderCards from '../RenderCards/RenderCards';
import { SHORT_FILM_DURATION,
         DEFAULT_CARDS_COUNT_DESKTOP,
         DEFAULT_CARDS_COUNT_PAD,
         DEFAULT_CARDS_COUNT_MOBILE,
         ADD_CARDS_COUNT_DESKTOP,
         ADD_CARDS_COUNT_PAD,
         ADD_CARDS_COUNT_MOBILE
       } from '../../utils/constants.js';

function MoviesCardList(props) {

  //console.log("рендер кардлист")
  //console.log(props)

  //const [windowSize, setWindowsSize] = React.useState(window.screen.width);
  //Кол-во карточек по умолчанию (для  логики появления кнопки Еще)
  const [cardsCount, setCardsCount] = React.useState(0);
  const [newCards, setNewCards] = React.useState([]);
   
  /*
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
  */

  //Применяем настройки
  React.useEffect(() => {
    setInitialSettings();
  }, [props.cards, props.isShort])
  
  /*
  //Заполняем массив карточек для отрисовки с учетом ширины монитора 
  //(если перешли с одного разрешения на другое, в последний ряд добавится количество карточек необходимое для ровного количества)
  React.useEffect(() => {
    if (window.innerWidth > 1300) {
      setCards(props.cards.slice(0, cardsCount - cardsCount % 3))
    }
    else if (window.innerWidth > 768) {
      setCards(props.cards.slice(0, cardsCount - cardsCount % 2))
    }
    else {
      setCards(props.cards.slice(0, cardsCount))
    }
  }, [cardsCount, props.cards])
  */
  
  //Функция применения первоначальных настроек
  function setInitialSettings() { 
    //console.log("применили инит настройки")

    if (window.innerWidth > 1300) {
      setCardsCount(DEFAULT_CARDS_COUNT_DESKTOP);
      if (props.isShort) {
        setNewCards(props.cards.filter(element => element.duration < SHORT_FILM_DURATION).slice(0, DEFAULT_CARDS_COUNT_DESKTOP))
        //setCardsCount(props.cards.filter(element => element.duration < 40).slice(0, 12).length);
      }
      else {
        setNewCards(props.cards.slice(0, DEFAULT_CARDS_COUNT_DESKTOP))
        //setCardsCount(props.cards.slice(0, 12).length);
      }
    }
    else if (window.innerWidth > 768) {
      setCardsCount(DEFAULT_CARDS_COUNT_PAD);
      if (props.isShort) {
        setNewCards(props.cards.filter(element => element.duration < SHORT_FILM_DURATION).slice(0, DEFAULT_CARDS_COUNT_PAD))
        //setCardsCount(props.cards.filter(element => element.duration < 40).slice(0, 8).length);
      }
      else {
        setNewCards(props.cards.slice(0, DEFAULT_CARDS_COUNT_PAD))
        //setCardsCount(props.cards.slice(0, 8).length);
      }
    }
    else {
      setCardsCount(DEFAULT_CARDS_COUNT_MOBILE);
      if (props.isShort) {
        setNewCards(props.cards.filter(element => element.duration < SHORT_FILM_DURATION).slice(0, DEFAULT_CARDS_COUNT_MOBILE))
        //setCardsCount(props.cards.filter(element => element.duration < 40).slice(0, 5).length);
      }
      else {
        setNewCards(props.cards.slice(0, DEFAULT_CARDS_COUNT_MOBILE))
        //setCardsCount(props.cards.slice(0, 5).length);
      }
    }    
  }

  //Функция обработчик клика на кнопку "Ещё"
  //Добавляем либо полный ряд карточек, либо добавляем до полного ряда, если есть хоть 1 карточка в ряду
  function handleMoreClick() {   
    const cardsCount = newCards.length;
    if (window.innerWidth > 1300) {      
      setNewCards(props.cards.slice(0, cardsCount + (ADD_CARDS_COUNT_DESKTOP - cardsCount % ADD_CARDS_COUNT_DESKTOP)))
      //setCardsCount(cardsCount + (3 - cardsCount%3))
    }
    else if (window.innerWidth > 768) {
      setNewCards(props.cards.slice(0, cardsCount + (ADD_CARDS_COUNT_PAD - cardsCount % ADD_CARDS_COUNT_PAD)))
      //setCardsCount(cardsCount + (2 - cardsCount%2))
    }
    else {
      setNewCards(props.cards.slice(0, cardsCount + ADD_CARDS_COUNT_MOBILE))
      //setCardsCount(cardsCount + 2)
    }
    //setClicks(clicks + 1);
  }

  return (
    <RenderCards 
      cards={props.cards} 
      newCards={newCards} 
      cardsCount={cardsCount} 
      onClick={handleMoreClick} 
      isShort={props.isShort} 
      moviesSavedList={props.moviesSavedList} 
      onLike={props.onLike} 
      onUnlike={props.onUnlike} />
  );
}

export default MoviesCardList;

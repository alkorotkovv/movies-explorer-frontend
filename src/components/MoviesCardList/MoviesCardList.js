import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import RenderCards from '../RenderCards/RenderCards';

function MoviesCardList(props) {

  console.log("рендер кардлист")
  console.log(props)

  //const [windowSize, setWindowsSize] = React.useState(window.screen.width);
  const [cardsCount, setCardsCount] = React.useState(0);
  const [newCards, setNewCards] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [clicks, setClicks] = React.useState(0);
 
  
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

  //Применяем стандартные настройки - количество отображаемых карточек = по умолчанию (сбрасывается)
  React.useEffect(() => {
    //console.log("mount list")
    setInitialSettings();
  }, [props.cards])

  React.useEffect(() => {
    //console.log("поменялся шорт")
    if (props.isShort) {
      setCards(props.cards.filter(element => element.duration < 40))
    }
    else {
      setCards(props.cards);
    }
  }, [props.cards, props.isShort])


  React.useEffect(() => {
    console.log("поменялся cards")
    
  }, [cards])

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
      setCardsCount(12);
      setNewCards(props.cards.slice(0, 12))
    }
    else if (window.innerWidth > 768) {
      setCardsCount(8);
      setNewCards(props.cards.slice(0, 8))
    }
    else {
      setCardsCount(5);
      setNewCards(props.cards.slice(0, 5))
    }    
  }

  //Функция обработчик клика на кнопку "Ещё"
  function handleMoreClick() {   
    if (window.innerWidth > 1300) {
      setCardsCount(cardsCount + (3 - cardsCount%3))
    }
    else if (window.innerWidth > 768) {
      setCardsCount(cardsCount + (2 - cardsCount%2))
    }
    else {
      setCardsCount(cardsCount + 2)
    }
    setClicks(clicks + 1);
  }

  return (
    <RenderCards cards={newCards} isShort={props.isShort} moviesSavedList={props.moviesSavedList} onLike={props.onLike} onUnlike={props.onUnlike} />
  );
}

export default MoviesCardList;

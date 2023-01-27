import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  //console.log ("props in cardlist")
  //console.log (props)
  let isFinish = false;

  const [windowSize, setWindowsSize] = React.useState(window.screen.width);
  const [cardsCount, setCardsCount] = React.useState(0);
  const [needShowCount, setNeedShowCount] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [clicks, setClicks] = React.useState(0);
  //const [clicksDesktop, setClicksDesktop] = React.useState(0);
  //const [clicksPad, setClicksPad] = React.useState(0);
  //const [clicksMobile, setClicksMobile] = React.useState(0);
  console.log("12222222")


  React.useEffect(() => {
    setInitialSettings();
    window.addEventListener('resize', handleResize);
    //return window.removeEventListener('resize', getWindowWidth);
  }, [])

  React.useEffect(() => {
    //setNeedShowCount(cardsCount + 3)
    //console.log(cardsCount);
    if (window.innerWidth > 1300) {
      setCards(props.cards.slice(0, cardsCount))
    }
    else if (window.innerWidth > 768) {
      setCards(props.cards.slice(0, cardsCount))
    }
    else {
      setCards(props.cards.slice(0, cardsCount))
    }    
  }, [cardsCount])

  React.useEffect(() => {
    setSettings();
  }, [clicks, windowSize])

  React.useEffect(() => {
    setSettings();
    if (needShowCount >= props.cards.length)
      isFinish = true;
    console.log(isFinish);

  }, [needShowCount])

  function handleResize() {
    setWindowsSize(window.screen.width);
  }

  function setInitialSettings() { 
    if (window.innerWidth > 1300) {
      setCardsCount(12);
      setCards(props.cards.slice(0, 12))
      setNeedShowCount(12)
    }
    else if (window.innerWidth > 768) {
      setCardsCount(8);
      setCards(props.cards.slice(0, 8))
      setNeedShowCount(8)
    }
    else {
      setCardsCount(5);
      setCards(props.cards.slice(0, 5))
      setNeedShowCount(5)
    }    
  }

  
  function setSettings() {
    console.log("settings")
    console.log(needShowCount)
    if (window.innerWidth > 1300) {
      setCardsCount(12 + 3*clicks)
      setCardsCount(needShowCount)
    }
    else if (window.innerWidth > 768) {
      setCardsCount(8 + 2*clicks)
      setCardsCount(needShowCount)
    }
    else {
      setCardsCount(5 + clicks)
      setCardsCount(needShowCount)
    }
    
  }
  

  
  function handleMoreClick() {
    //console.log("click")
    //console.log(cardsCount)
    
    if (window.innerWidth > 1300) {
      //setClicksDesktop(clicksDesktop + 1)
      //setCardsCount(cardsCount + 3)
      setNeedShowCount(cardsCount + 3)
    }
    else if (window.innerWidth > 768) {
      //setClicksPad(clicksPad + 1)
      //setCardsCount(cardsCount + 2)
      setNeedShowCount(cardsCount + 2)
    }
    else {
      //setClicksMobile(clicksMobile + 1)
      //setCardsCount(cardsCount + 1)
      setNeedShowCount(cardsCount + 1)
    }
    setClicks(clicks + 1)
  }



  const location = useLocation().pathname;

  let block;

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
    <button className={"movies__button-more" + (needShowCount >= props.cards.length? " movies__button-more_unvisible" : "")} type="button" onClick={handleMoreClick} >Ещё</button>
    </>
  );
}

export default MoviesCardList;

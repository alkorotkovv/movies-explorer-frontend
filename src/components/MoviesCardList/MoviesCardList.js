import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  //console.log ("props in cardlist")
  //console.log (props)

  const [windowSize, setWindowsSize] = React.useState(window.screen.width);
  const [cardsCount, setCardsCount] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [clicks, setClicks] = React.useState(0);


  React.useEffect(() => {
    setInitialSettings();
    window.addEventListener('resize', handleResize);
    //return window.removeEventListener('resize', getWindowWidth);
  }, [])

  React.useEffect(() => {
    console.log();
    console.log(cardsCount);
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
  }, [windowSize, clicks])

  function handleResize() {
    setWindowsSize(window.screen.width);
  }

  function setInitialSettings() { 
    if (window.innerWidth > 1300) {
      setCardsCount(12);
      setCards(props.cards.slice(0, 12))
    }
    else if (window.innerWidth > 768) {
      setCardsCount(8);
      setCards(props.cards.slice(0, 8))
    }
    else {
      setCardsCount(5);
      setCards(props.cards.slice(0, 5))
    }    
  }

  
  function setSettings() {
    console.log("settings")
    console.log(cardsCount)
    if (window.innerWidth > 1300) {
      setCardsCount(12 + clicks)
    }
    else if (window.innerWidth > 768) {
      setCardsCount(8 + clicks)
    }
    else {
      setCardsCount(5 + clicks)
    }
    
  }
  

  
  function handleMoreClick() {
    console.log("click")
    //setClicks(clicks + 1)
    if (window.innerWidth > 1300) {
      setCardsCount(cardsCount + 3)
      setClicks(clicks + 3)
    }
    else if (window.innerWidth > 768) {
      setCardsCount(cardsCount + 2)
      setClicks(clicks + 2)
    }
    else {
      setCardsCount(cardsCount + 1)
      setClicks(clicks + 1)
    }
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
    <button className="movies__button-more" type="button" onClick={handleMoreClick} >Ещё</button>
    </>
  );
}

export default MoviesCardList;

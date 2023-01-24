import { Link, useLocation } from 'react-router-dom';

function InfoTooltip(props) {

  return (
    <main className="NotFoundPage">
      <h2 className="NotFoundPage__title">404</h2>
      <p className="NotFoundPage__subtitle">Страница не найдена</p>
      <Link to="/" className="NotFoundPage__button" >Назад</Link>
    </main>
  )
}

export default InfoTooltip;
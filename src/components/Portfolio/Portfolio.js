import arrow from '../../images/me.jpg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a href="https://alkorotkovv.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer">Статичный сайт</a>
          <a href="https://alkorotkovv.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer">↗</a>
        </li>
        <li className="portfolio__item">
          <a href="https://alkorotkovv.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <a href="https://alkorotkovv.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">↗</a>
        </li>
        <li className="portfolio__item">
          <a href="https://alkorotkovv.github.io/family-tree-react/" className="portfolio__link" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <a href="https://alkorotkovv.github.io/family-tree-react/" className="portfolio__link" target="_blank" rel="noreferrer">↗</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

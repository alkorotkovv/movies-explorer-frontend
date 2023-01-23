function AboutProject() {
  return (
    <section className="about" id='about'>
      <h2 className="about__title">О проекте</h2>
      <div className="about__plan">
        <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about__time">
        <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about__graph">
        <ul className="about__period">
          <p className="about__graphtitle about__graphtitle_color_black">1 неделя</p>
          <p className="about__graphtext">Back-end</p>
        </ul>
        <ul className="about__period">
          <p className="about__graphtitle">4 недели</p>
          <p className="about__graphtext">Front-end</p>
        </ul>
      </div>
      
    </section>
  );
}

export default AboutProject;

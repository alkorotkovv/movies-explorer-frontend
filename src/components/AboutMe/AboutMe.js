import mePhoto from '../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio.js';

function AboutMe() {
  return (
    <>
    <section className="about-me" id='about-me'>
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <h3 className='about-me__name'>Александр</h3>
        <p className='about-me__job'>Инженер, 28 лет</p>
        <p className='about-me__text'>Родился в городе Нижний Новгород 12 марта 1995 года. С 6 лет пошел в школу №82 (лицей) и отучился 11 классов. В 2012 году поступил в ННГУ им. Лобачевского. Сначала обучался на факультете ВМК. Потом его и механико-математический объединили в ИИТММ. После 4ёх лет обучения получил степень бакалавра, после еще 2ух лет - степень магистра. В 2018 году устроился на работу в ООО Синтек, где работаю инженером по настоящее время</p>
        <a href="https://github.com/alkorotkovv" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
      </div>
      <img className="about-me__photo" src={mePhoto} alt="фотография"/>
    </section>
    <Portfolio />
    </>
  );
}

export default AboutMe;

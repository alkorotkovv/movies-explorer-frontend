import AboutMe from '../AboutMe/AboutMe.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Promo from '../Promo/Promo.js';
import Techs from '../Techs/Techs.js';

function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default Main;

import React from 'react';
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import PortfolioPage from '../PortfolioPage/PortfolioPage'
import AboutPage from '../AboutPage/AboutPage'
import HomePage from '../HomePage/HomePage'
import {Route, Switch} from 'react-router-dom'
import './App.css';

function App() {
  const [darkModeCheck, setDarkModeCheck] = React.useState(false)
  const [darkModeClass, setDarkMode] = React.useState("App")
  const [darkPortfolio, setDarkPortfolio] = React.useState("Portfolio-Page")
  const [darkAbout, setDarkAbout] = React.useState("About-Page row")
  const [darkImage, setDarkImage] = React.useState("brightness_3")
  const darkMode = () => {
    if (darkModeCheck === false) {
      setDarkMode("App dark")
      setDarkImage("wb_sunny")
      setDarkPortfolio("Portfolio-Page dark")
      setDarkAbout("About-Page dark row")
      setDarkModeCheck(true)
    } else {
      setDarkMode("App")
      setDarkImage("brightness_3")
      setDarkPortfolio("Portfolio-Page")
      setDarkAbout("About-Page row")
      setDarkModeCheck(false)
    }
}
  return (
    <div className={darkModeClass}>
      <Header darkMode={darkMode} darkImage={darkImage} />
      <div className="page-box">
        <Switch>
          <Route exact path='/myportfolio' render={
            () => <HomePage darkMode={darkMode} />
            }/>
          <Route exact path='/myportfolio/portfolio' render={
            ()=> <PortfolioPage darkPortfolio={darkPortfolio} />
          } />
          <Route exact path='/myportfolio/about' render={
            ()=> <AboutPage darkAbout={darkAbout} />
          } />
        </Switch>
        <div class="fixed-action-btn">
          <a href="mailto:joaquimprgrilo@gmail.com" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">mail</i><br/> Contact</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

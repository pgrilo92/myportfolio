import React from 'react';
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ContactPage from '../ContactPage/ContactPage'
import PortfolioPage from '../PortfolioPage/PortfolioPage'
import AboutPage from '../AboutPage/AboutPage'
import HomePage from '../HomePage/HomePage'
import {Route, Switch} from 'react-router-dom'
import './App.css';

function App() {
  const [darkModeClass, setDarkMode] = React.useState("App")
  const [darkImage, setDarkImage] = React.useState("brightness_3")
  const darkMode = () => {
    if (darkModeClass === "App") {
      setDarkMode("App dark")
      setDarkImage("wb_sunny")
    } else {
      setDarkMode("App")
      setDarkImage("brightness_3")
    }
}
  return (
    <div className={darkModeClass}>
      <Header darkMode={darkMode} darkImage={darkImage} />
      <Switch>
        <Route exact path='/' render={
          () => <HomePage darkMode={darkMode} />
          }/>
        <Route exact path='/portfolio' render={
          ()=> <PortfolioPage/>
        } />
        <Route exact path='/about' render={
          ()=> <AboutPage/>
        } />
        <Route exact path='/contact' render={
          ()=> <ContactPage/>
        } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

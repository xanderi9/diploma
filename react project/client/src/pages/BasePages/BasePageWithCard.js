import React, { useState } from 'react';
import Header from '../../components/Header/Header.js';
import Background from '../../components/Background/Background.js';
import Footer from '../../components/Footer/Footer.js';
import Card from '../../components/Card/Card.js';
import styles from '../../container.module.css'

const BasePageWithCard = ({ isAuthenticated, children, data }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
    return (
        <Background darkMode={darkMode} toggleTheme={toggleTheme}>
        <Header isAuthenticated={isAuthenticated} toggleMenu={toggleMenu} toggleTheme={toggleTheme} isSideMenuOpen={isSideMenuOpen} darkMode={darkMode} data={data}  />
        <div className={styles.container}>
        <Card darkMode={darkMode}>
       {children}
       </Card>
       </div>
        <Footer darkMode={darkMode} />
      </Background>

    );
  };
  export default BasePageWithCard;

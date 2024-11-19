import React, { useState } from 'react';
import Header from '../../components/Header/Header.js';
import Background from '../../components/Background/Background.js';
import Footer from '../../components/Footer/Footer.js';
import SideMenu from '../../components/SideMenu/SideMenu.js';

const BasePage = ({ isAuthenticated, children, data }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // Клонируем children и передаем им darkMode
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { darkMode: darkMode });
    }
    return child;
  });

  return (
    <Background darkMode={darkMode} toggleTheme={toggleTheme}>
      <Header isAuthenticated={isAuthenticated} toggleMenu={toggleMenu} toggleTheme={toggleTheme} isSideMenuOpen={isSideMenuOpen} darkMode={darkMode} data={data} />
      {childrenWithProps}
      <Footer darkMode={darkMode} />
    </Background>
  );
};

export default BasePage;

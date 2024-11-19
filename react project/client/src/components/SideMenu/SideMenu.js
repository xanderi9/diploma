import React, { useState } from 'react';
import styles from './SideMenu.module.css';
import { Link } from 'react-router-dom';
import SideMenuTeacher from './SideMenuTeacher';
import SideMenuStudent from './SideMenuStudent';
import SideMenuSecretary from './SideMenuSecretary';

const SideMenu = ({ toggleMenu, isSideMenuOpen, darkMode, data }) => {

  const type_of_user = localStorage.getItem('type_of_user');

  let SideMenuComponent;
  switch (type_of_user) {
    case 'Руководитель':
      SideMenuComponent = SideMenuTeacher;
      break;
    case 'Выпускник':
      SideMenuComponent = SideMenuStudent;
      break;
    case 'Секретарь ГЭК':
      SideMenuComponent = SideMenuSecretary;
      break;
    default:
      SideMenuComponent = <></>;
  }
  

  return (
    <>
      <div style={{ display: isSideMenuOpen ? 'block' : 'none' }}>
        <div className={`${styles.sidebar} ${darkMode ? styles.dark_mode : ''}`}>
          <button className={styles.close_btn} onClick={() => { toggleMenu(); }}>×</button>
          <SideMenuComponent />
        </div>
      </div>

      {isSideMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default SideMenu;

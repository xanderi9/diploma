import React, { Component, useState } from 'react';
import styles from './SideMenu.module.css';
import {Link} from 'react-router-dom'


const SideMenuSecretary = ({ toggleMenu, isSideMenuOpen, darkMode }) => {
 
  return (
    <>
      <ul>
        <li><Link to='/profile_secretary'>Личный кабинет</Link></li>
        <li><Link to="/view_protection_schedule"> График защит ВКР</Link></li>
        <li><Link to="/view_protection_schedule_persons"> График защит ВКР (пофамильный)</Link></li>
        <li><Link to="/generate_protocols"> Генерация протоколов</Link></li>
        <li><Link to="/view_protection_schedule"> Инфо </Link></li>
        <li><Link to="/view_themes_sec"> Темы ВКР</Link></li>
        <li><Link to="/publish_orders"> Приказы </Link></li>
        </ul>
    </>
  );
};

export default SideMenuSecretary;

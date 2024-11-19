import React, { Component, useState } from 'react';
import styles from './SideMenu.module.css';
import {Link} from 'react-router-dom'

const SideMenuTeacher = ({ toggleMenu, isSideMenuOpen, darkMode }) => {
  return (
    <>
      <ul>
        <li><Link to='/profile_teacher'>Личный кабинет</Link></li>
        <li><Link to='/supervised_students'>Курируемые выпускники</Link></li>
        <li><Link to="/view_protection_schedule_teacher"> График защит ВКР</Link></li>
        <li><Link to="/view_protection_schedule_persons_t"> График защит ВКР (пофамильный)</Link></li>
        <li><Link to="/view_themes"> Темы ВКР</Link></li>
        <li><Link to="#"> Инфо </Link></li>
        <li><Link to="#"> Приказы </Link></li>
        </ul>
    </>
  );
};

export default SideMenuTeacher;

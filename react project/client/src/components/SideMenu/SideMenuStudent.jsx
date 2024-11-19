import React, { Component, useState } from 'react';
import styles from './SideMenu.module.css';
import {Link} from 'react-router-dom'


const SideMenuStudent = ({ toggleMenu, isSideMenuOpen, darkMode }) => {
 
  return (
    <>
      <ul>
        <li><Link to='/profile_student'>Личный кабинет</Link></li>
        <li><Link to="/view_student_request"> Моя заявка</Link></li>
        <li><Link to="/view_protection_schedule_student"> График защит ВКР</Link></li>
        <li><Link to="/view_protection_schedule_persons_s"> График защит ВКР (пофамильный)</Link></li>
        <li><Link to="/view_themes_s"> Темы ВКР</Link></li>
        <li><Link to="#"> Инфо </Link></li>
        <li><Link to="#"> Приказы </Link></li>
        </ul>
    </>
  );
};

export default SideMenuStudent;

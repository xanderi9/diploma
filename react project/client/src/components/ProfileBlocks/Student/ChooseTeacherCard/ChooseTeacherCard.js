import React, { Component } from 'react'
import styles from '../ProfileBlocks.module.css';
import { Link } from "react-router-dom";

export default class ChooseTeacherCard extends Component {
  render() {
    return (
        <div className={styles.card}>
        <p class="text-center p-4 fw-bold"> Выбор руководителя и темы ВКР еще не состоялся </p>
         <Link to='/choose_teacher' type="submit" class={styles.button_choose_ruk}>Посмотреть наличие мест у руководителей</Link>
    </div>
    )
  }
}

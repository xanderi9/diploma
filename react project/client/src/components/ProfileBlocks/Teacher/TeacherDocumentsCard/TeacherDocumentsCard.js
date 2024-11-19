import React, { Component } from 'react'
import StudentDocuments from '../../../Documents/StudentDocuments/StudentDocuments'
import styles from '../../ProfileBlocks.module.css';
import TeacherDocuments from '../../../Documents/TeacherDocuments/TeacherDocuments';

export default class TeacherDocumentsCard extends Component {
  render() {
    return (
<div className={styles.card}>
        <p class="text-center px-1 py-2 fw-bold"> Формы документов и полезная информация </p>

        <TeacherDocuments/>
        <details>
        <summary>Документы, формируемые выпускником</summary>
        <StudentDocuments/>
        </details>
        
    </div>



    )
  }
}

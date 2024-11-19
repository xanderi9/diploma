import React, { Component } from 'react'
import styles from '../ProfileBlocks.module.css';
import StudentDocuments from '../../../Documents/StudentDocuments/StudentDocuments';

export default class DocumentsCard extends Component {
  render() {
    return (
        <div className={styles.card}>
        <p class="text-center px-1 py-2 fw-bold"> Формы документов и полезная информация </p>
          <StudentDocuments/>
    </div>
    )
  }
}

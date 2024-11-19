import React from 'react'
import StudentDocuments from '../../../Documents/StudentDocuments/StudentDocuments'
import TeacherDocuments from '../../../Documents/TeacherDocuments/TeacherDocuments'
import styles from '../../ProfileBlocks.module.css'
import SecretaryDocuments from '../../../Documents/SecretaryDocuments/SecretaryDocuments'
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function DocumentsCardSecretary() {
  return (
    <div className={styles.card}>
        <p class="text-center px-1 py-2 font-weight-bold"> Формы документов и полезная информация </p>
<Row className='justify-content-center'>
        <Col md={11}>

<div className={styles.block_info_documents}>
    <Link variant='none' to='https://ikit.sfu-kras.ru/node/1014'>      
    Остальные формы документов Вы можете найти здесь</Link>
    </div>
    
        <SecretaryDocuments/>
        <details>
        <summary>Документы, формируемые выпускником</summary>
        <StudentDocuments/>
        </details>
        <details>
        <summary>Документы, формируемые руководителем</summary>
        <TeacherDocuments/>
        </details>
        </Col>
        </Row>
          </div>
  )
}

export default DocumentsCardSecretary
import React, { Component } from 'react'
import BaseModal from '../BaseModal/BaseModal'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles_base from '../BaseModal/BaseModal.module.css'
import styles from '../ThemeListModal/ThemeListModal.module.css'
import {Link} from 'react-router-dom'

export default class ThemeListModal extends Component {
    render() {
        const { show, handleClose, darkMode, themes_list, fullname, type_of_user } = this.props;
      
       
        const modalstyle = {
            modal: styles.container_modal 
          };
          console.log (type_of_user)
          let roleText;
          let path;
          switch (type_of_user) {
            case 'Руководитель':
              roleText = 'Руководитель: ';
              path = '/edit_theme_list_teacher'
              break;
            case 'Секретарь ГЭК':
              roleText = 'Кафедра СИИ ';
              path = '/edit_theme_list_secretary'
              break;
            default:
              roleText = 'Неизвестный тип пользователя: ';
          }
          console.log (roleText)
        const content = (
            <>
            {type_of_user === 'Руководитель' && (
        <p className="fw-bold">{roleText} {fullname}</p>
      )}
       {type_of_user === 'Секретарь ГЭК' && (
        <p className="fw-bold">{roleText}</p>
      )}
            

            {themes_list.map((theme, index) => (
  <div key={index} className='my-2'>{theme.name}</div>
))}



              </>
          );

          const footer = (
            <Row className="justify-content-between px-3">
                <Col md={5}>
              <Button variant='none' className={styles_base.button_cancel} onClick={handleClose}>Отмена</Button>
              </Col>
              <Col md={5}>
              
              <Link to={{
                pathname: path,
              
              }}>
              <Button variant='none' className={styles_base.button_next} onClick={handleClose}>Редактировать</Button>
              </Link>
              </Col>
              </Row>
          );

        return (
          <BaseModal show={this.props.show} 
          modalClass = {styles.container_modal}
          handleClose={this.props.handleClose} 
          title={'Список тем'}
          type_of_user={type_of_user}
          content={content} 
          darkMode={darkMode}
          sourceData={themes_list}
          footer={footer}
         
          > 
            </BaseModal>
        )
      }
    }
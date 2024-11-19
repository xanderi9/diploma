import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../BaseModal/BaseModal.module.css'


const BaseModal = ({ show, handleClose,modalClass, title, content,  footer, darkMode, sourceData, type_of_user, request_data_task,data }) => {

    const closeButtonClass = darkMode ? styles.closeButtonDark : styles.closeButtonLight;

    return (
      <Modal show={show} onHide={handleClose} dialogClassName={modalClass} >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body type_of_user={type_of_user}>
       {content}
        </Modal.Body>
        <Modal.Footer>
            {footer}
        </Modal.Footer>

      </Modal>
    );
  };
  
  export default BaseModal;
  
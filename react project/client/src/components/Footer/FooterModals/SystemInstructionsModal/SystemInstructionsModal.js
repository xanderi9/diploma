import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../../FooterModals/Modals.module.css'

const SystemInstructionsModal = ({ show, handleClose }) => {
  return (
    <Modal  show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Инструкции по работе в системе</Modal.Title>
      </Modal.Header>
      <Modal.Body >
     <p> Здесь когда-нибудь появятся инструкции для работы в системе</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="none" className={styles.modal_button} onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SystemInstructionsModal;

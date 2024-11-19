import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../SettingsModal/SettingsModal.module.css'

const SettingsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modalsettings">
      <Modal.Header closeButton>
        <Modal.Title>Настройки уведомлений</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="notification_order">
            <Form.Check type="checkbox" label="О выходе приказов" />
          </Form.Group>
          <Form.Group controlId="notification_presentation">
            <Form.Check type="checkbox" label="О предстоящей защите ВКР" />
          </Form.Group>
          <Form.Group controlId="deadline_schedule">
            <Form.Check type="checkbox" label="О приближении дедлайна в графике" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Row>
            <Col>
        <Button variant="none" className={styles.modal_button} onClick={handleClose}>
          Закрыть
        </Button>
        </Col>
        <Col>
        <Button variant="none" className={styles.button_save_settings} onClick={handleClose}>
          Сохранить
        </Button>
        </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;

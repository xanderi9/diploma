import React, { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import styles from './StudentRequestView.module.css';
import { Link } from 'react-router-dom';
import ModalDeleteRequest from '../Modals/ModalDeleteRequest/ModalDeleteRequest';

function StudentRequestView({ request }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setShowDeleteModal(prevState => !prevState);
  };

  const handleDeleteRequest = () => {
    setShowDeleteModal(false);
  };
const req = request.request[0]
  return (
    <>
      <h4 className='text-center mb-3'>Моя заявка на курирование ВКР</h4>

      {req ? (
        <>
          <Row className='justify-content-center'>
            <Col md={3}>Статус заявки</Col>
            <Col md={5}>
              {req.is_accepted_request === true ? "Заявка принята" :
                req.is_accepted_request === false ? "Заявка отклонена" :
                  "На заявку еще не получен отклик"}
            </Col>
          </Row>

          {req.is_accepted_request === true && (
            <Row className='justify-content-center'>
              <Col md={3}>Статус темы</Col>
              <Col md={5}>
                {req.is_accepted_theme === true ? "Тема утверждена" :
                  req.is_accepted_theme === false ? "Тема не утверждена" :
                    "Статус темы не определён"}
              </Col>
            </Row>
          )}

          <Row className='justify-content-center'>
            <Col md={3}>Тема ВКР</Col>
            <Col md={5}>{req.theme.name}</Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={3}>Руководитель</Col>
            <Col md={5}>{req.teacher.last_name} {req.teacher.first_name} {req.teacher.patronymic}</Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={3}>ВКР по заявке</Col>
            <Col md={5}>{req.theme.fqw_by_application}</Col>
          </Row>

          <Row className='justify-content-center my-3'>
            <Col md={2}>
              <Button variant='light' className={styles.button1} onClick={toggleDeleteModal}>Удалить заявку</Button>
            </Col>
            <Col md={2}>
              <Link to='/choose_theme'>
                <Button variant='light' className={styles.button3}>Сменить тему</Button>
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <Row className='justify-content-center'>
          <Col md={3}>Статус заявки</Col>
          <Col md={5}>На заявку еще не получен отклик</Col>
        </Row>
      )}

      <ModalDeleteRequest
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleDelete={handleDeleteRequest}
        darkMode={false}
      />
    </>
  );
}

export default StudentRequestView;

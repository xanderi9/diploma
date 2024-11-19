import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../../ProfileBlocks.module.css';

const RequestsContent = ({ currentRequest, handleAccept, handleDecline, studentList }) => {
  // Найти информацию о студенте в studentList по student.id
  const studentInfo = studentList.find(student => student.user_id === currentRequest.student.id);

  return (
    <div className="request_field">
      {currentRequest.is_accepted_request === null ? (
        <h6 className='text-center'>Заявка на курирование ВКР</h6>
      ) : (
        currentRequest.is_accepted_request === true && currentRequest.is_accepted_theme === false ? (
          <h6 className='text-center'>Заявка на смену темы ВКР</h6>
        ) : null
      )}
      <Row>
        <Col md={7} xs={12}>{currentRequest.student.last_name} {currentRequest.student.first_name} {currentRequest.student.patronymic}</Col>
        <Col md={3} xs={4}>{studentInfo && studentInfo.group ? studentInfo.group.name : ''}</Col>
        <Col md={2} xs={3}>{studentInfo && studentInfo.average_score ? studentInfo.average_score : ''}</Col>
      </Row>
      <Row>
        <Col md={4} xs={4} className="font-weight-bold">Тема ВКР:</Col>
        <Col md={8} xs={8}>{currentRequest.theme.name}</Col>
      </Row>
      <Row>
        <Col md={4} xs={4}>Тип ВКР:</Col>
        <Col md={8} xs={8}>{currentRequest.type_of_fqw}</Col>
      </Row>
      <Row>   
        <Col md={4} xs={12}>Дополнительно:</Col>
        <Col md={8} xs={12}>{currentRequest.additional_information}</Col>
      </Row>
      {
        currentRequest.is_accepted_request === true && currentRequest.is_accepted_theme === false ? 
        (<div className='my-2'> </div>) :
        (<Row>
          <Col md={1} xs={2}>
            <Form.Check type="checkbox" id={currentRequest.id} className={styles.checkbox_style}/>
          </Col>
          <Form.Label className="col-md-11 col-10">
            Утвердить тему ВКР
          </Form.Label>
        </Row>)
      }

      {currentRequest.is_accepted_request === null ? (
        <Row className="d-flex justify-content-center">
          <Col md={5} xs={5}>
            <Button variant='none' className={styles.button_accept} onClick={handleAccept}>Принять заявку</Button>
          </Col>
          <Col md={5} xs={5}>
            <Button variant='none' className={styles.button_decline} onClick={handleDecline}>Отклонить заявку</Button>
          </Col>
        </Row>
      ) : (
        currentRequest.is_accepted_request === true && currentRequest.is_accepted_theme === false ? (
          <Row className="d-flex justify-content-center">
            <Col md={5} xs={5}>
              <Button variant='none' className={styles.button_accept} onClick={handleAccept}>Принять тему</Button>
            </Col>
            <Col md={5} xs={5}>
              <Button variant='none' className={styles.button_decline} onClick={handleDecline}>Отклонить тему</Button>
            </Col>
          </Row>
        ) : null
      )}
    </div>
  );
};

export default RequestsContent;

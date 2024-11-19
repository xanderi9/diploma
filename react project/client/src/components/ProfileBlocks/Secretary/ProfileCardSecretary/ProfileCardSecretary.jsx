import React, { Component, useState } from 'react'
import styles from '../../ProfileBlocks.module.css';
import profile_pic from '../../../../img/profile_pic.png';
import settings from '../../../../img/settings.png';
import hide from '../../../../img/hide.png';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SettingsModal from '../../../Modals/SettingsModal/SettingsModal';
import NoteModal from '../../../Modals/NoteModal/NoteModal';


const ProfileCardSecretary= ({ secretaryData }) => {
  console.log(secretaryData)
  const [showModal, setShowModal] = useState(null); // Состояние для отслеживания отображаемого модального окна

  // Функция для открытия модального окна
  const handleShowModal = (modalName) => {
    setShowModal(modalName);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setShowModal(null);
  };
  const fullname = secretaryData.user[0].last_name + ' ' + secretaryData.user[0].first_name + ' ' + secretaryData.user[0].patronymic;

    return (
     
      <div className={styles.card}>
        <div className={styles.block}>
        <Row>
            <Col md={3} className="ml-2">
            <img src={profile_pic} width="80%" alt="profile_pic" loading="lazy"/>
            </Col>
            <Col md={9} xs={9}>
            <Row className="mt-n2 mt-md-0">
              <Col md={10} xs={8}>
                <p className={ `${styles.block_item} fw-bold`}>{fullname}</p>
              </Col>
              <Col md={2} xs={4} className="text-right">
                <img src={hide} width="40%" alt="Icon" loading="lazy" id="toggleButton" />
              </Col>
        </Row>
        
        <Row className="mt-1">
              <Col md={6} xs={8}>
                <div>Тип пользователя</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
               <div>{ secretaryData.user[0].type_of_user[0].name }</div>
              </Col>
        </Row>
        
        </Col>
        </Row>
        </div>

        <div className={`${styles.block} `}>
      <div className="text-center fw-bold mb-2">Контактная информация</div>
      <Row className="mt-1 justify-content-center">
        <Col md={4} xs={4} className="ml-2">
          <div>Номер:</div>
        </Col>
        <Col md={7} xs={7}>
          <div>{secretaryData.user[0].phone}</div>
        </Col>
      </Row>
      <Row className="mb-2 mt-1  justify-content-center">
        <Col md={4} xs={4} className="ml-2">
          <div>Почта:</div>
        </Col>
        <Col md={7} xs={7}>
          <div>{secretaryData.user[0].email}</div>
        </Col>
      </Row>
    </div>

    <div className={`${styles.block} `}>
      <p className="text-center fw-bold">Информация о сотруднике</p>
      <Row className="mt-1  justify-content-center">
        <Col md={4} xs={4} className="ml-2">
          <div>Должность:</div>
        </Col>
        <Col md={7} xs={7}>
          <div>{secretaryData.employee_information[0].job_title}</div>
        </Col>
      </Row>
      <Row className="mt-1  justify-content-center">
        <Col md={4} xs={4} className="ml-2">
          <div>Ученая степень:</div>
        </Col>
        <Col md={7} xs={7}>
          <div>{secretaryData.employee_information[0].academic_title}</div>
        </Col>
      </Row>
      <Row className="mt-1  justify-content-center">
        <Col md={4} xs={4} className="ml-2">
          <div>Ученое звание:</div>
        </Col>
        <Col md={7} xs={7}>
          <div>{secretaryData.employee_information[0].academic_degree}</div>
        </Col>
      </Row>
      <Row className="mb-2 mt-1 justify-content-center">
        <Col md={4} xs={4} className="ml-2">
          <div>Место работы:</div>
        </Col>
        <Col md={7} xs={7}>
          <div>{secretaryData.employee_information[0].place_of_work}</div>
        </Col>
      </Row>
    </div>

          

            <Row className="justify-content-left">
        <Col>
          <Button variant='none' className={styles.button_note} onClick={() => handleShowModal('note')}>Сообщить о неточности</Button>
        </Col>
        <Col>
          <Button variant='none' href='/edit_secretary_profile' className={styles.button_edit_prof} >Редактировать</Button>
        </Col>
      </Row>
      {showModal === 'note' && <NoteModal show={true} handleClose={handleCloseModal}/>}
      {showModal === 'settings' && <SettingsModal show={true} handleClose={handleCloseModal} />}
        </div>
        
     
    )
  }

export default ProfileCardSecretary;
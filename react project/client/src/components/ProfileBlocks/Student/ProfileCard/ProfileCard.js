import React, { Component, useState } from 'react'
import styles from '../ProfileBlocks.module.css';
import profile_pic from '../../../../img/profile_pic.png';
import settings from '../../../../img/settings.png';
import hide from '../../../../img/hide.png';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SettingsModal from '../../../Modals/SettingsModal/SettingsModal';
import NoteModal from '../../../Modals/NoteModal/NoteModal';


const ProfileCard = ({ studentData }) => {
  console.log(studentData)
  const [showModal, setShowModal] = useState(null); 

  // Функция для открытия модального окна
  const handleShowModal = (modalName) => {
    setShowModal(modalName);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setShowModal(null);
  };
    const user =  studentData.user[0].user
    const group = studentData.user[0].group
  const fullname = user.last_name + ' ' + user.first_name + ' ' + user.patronymic;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

    return (
     
      <div className={styles.card}>
        <div className={styles.block}>
        <Row>
            <Col md={3} className="ml-2" >
            <img src={profile_pic} width="80%" alt="profile_pic" loading="lazy"/>
            </Col>
            <Col md={9} xs={9}>
            <Row className="mt-n2 mt-md-0">
              <Col md={10} xs={8}>
                <p className={ `${styles.block_item} fw-bold`}>{fullname}</p>
              </Col>
            
        </Row>
        
        <Row className="mt-1">
              <Col md={6} xs={8}>
                <div>Тип пользователя</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
               <div>{ user.type_of_user[0].name }</div>
              </Col>
        </Row>

        <Row className="mt-1">
              <Col md={6} xs={8}>
                <div> Курс</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
              <div>{ group && group.course_number ? group.course_number : ' '}</div>
              </Col>
        </Row>

        <Row className="mt-1">
              <Col md={6} xs={8}>
                <div>Группа:</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
              <div>{ group && group.name ? group.name : ' '}</div>
              </Col>
        </Row>

        <Row className="mt-1">
              <Col md={6} xs={8}>
                <div>Дата рождения:</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
               <div>{  formatDate(studentData.user[0].date_of_birth) }</div>
              </Col>
        </Row>


        <Row className="mt-1">
              <Col md={6} xs={8} className="mb-md-2">
                <div>Заявок отправлено:</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
               <div>{ studentData.user[0].number_of_requests }</div>
              </Col>
        </Row>

        </Col>
        </Row>
        </div>
        <div className={`${styles.block} `}>
      <p className="text-center fw-bold">Контактная информация</p>
      <Row className="mt-1 justify-content-center">
        <Col md={5} xs={4} >
          <div>Номер:</div>
        </Col>
        <Col md={6} xs={7}>
          <div>{user.phone}</div>
        </Col>
      </Row>
      <Row className="mt-1 justify-content-center">
        <Col md={5} xs={4} >
          <div>Почта:</div>
        </Col>
        <Col md={6} xs={7}>
          <div>{user.email}</div>
        </Col>
      </Row>

      <Row className="mt-1 mb-2 justify-content-center">
        <Col md={5} xs={4} >
          <div>Публичный профиль:</div>
        </Col>
        <Col md={6} xs={7}>
          <div>{studentData.user[0].access_contacts_agree ? 'да' : 'нет'}</div>
        </Col>
      </Row>

    </div>
    



    <div className={`${styles.block} additional_profile_blocks`}>
             <p class="text-center fw-bold"> Успеваемость </p>

             <Row className="justify-content-center mt-1">
              <Col md={5} xs={8}>
                <div>Уровень образования:</div>
              </Col>
              <Col md={6} xs={4} className="text-right">
               <div>{ studentData.user[0].level_of_education }</div>
              </Col>
        </Row>

             <Row className='justify-content-center  mt-1'>
          <Col xs={5}>
            <div>Номер зачетки:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].record_book_number}</div>
          </Col>
        </Row>

        <Row className='justify-content-center  mt-1'>
          <Col xs={5}>
            <div>Средний балл:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].average_score}</div>
          </Col>
        </Row>

        <Row className='justify-content-center  mt-1'>
          <Col xs={5}>
          <div>Форма обучения:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].form_of_education}</div>
          </Col>
        </Row>

        <Row className='justify-content-center  mt-1'>
          <Col xs={5}>
          <div>Основа обучения:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].basis_of_study}</div>
          </Col>
        </Row>

        <Row className='justify-content-center  mt-1 mb-2'>
          <Col xs={5}>
          <div>Староста:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].group_leader ? 'да' : 'нет'}</div>
          </Col>
        </Row>
            </div>

            <div className={`${styles.block} additional_profile_blocks`}>
            <p className="text-center fw-bold">Данные о прошлом образовании</p>
        
        <Row className='justify-content-center  mt-1'>
          <Col xs={5}>
            <div >Год окончания:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].year_of_prev_education_completion}</div>
          </Col>
        </Row>
        <Row className='justify-content-center  mt-1'>
          <Col xs={5}>
            <div>Форма предыдущего образования:</div>
          </Col>
          <Col xs={6}>
            <div>{studentData.user[0].form_of_prev_education}</div>
          </Col>
        </Row>
        <Row className='justify-content-center mt-1 mb-2'>
          <Col xs={5}>
            <div className="block-item">Год поступления:</div>
          </Col>
          <Col xs={6}>
            <div className="block-item">{studentData.user[0].year_of_admission}</div>
          </Col>
        </Row>
              </div>




            <div className={`${styles.block} additional_profile_blocks`}>
                  <Row className="justify-content-center">
                    <Col>
            <p class='text-center fw-bold'> Уведомления 
          
           <img src={settings} class={`mx-3 ${styles.settings}`} width="30" height="30" loading="lazy" onClick={() => handleShowModal('settings')}/>
           </p>
           </Col>
               </Row>
               <Row className="mt-1 justify-content-center">
               <Col md={9} className="ml-2">
                  <div>О выходе приказов:</div>
                </Col>
                <Col md={2}>
                <div>{studentData.user[0].notification_order ? "да" : "нет"}</div>
                </Col>
                </Row>

                <Row className="mt-1 justify-content-center">
               <Col md={9} className="ml-2">
                  <div>О предстоящей защите ВКР:</div>
                </Col>
                <Col md={2}>
                <div>{studentData.user[0].notification_schedule ? "да" : "нет"}</div>
                </Col>
                </Row>

                <Row className="mb-2 mt-1 justify-content-center">
               <Col md={9} className="ml-2">
                  <div>О приближении дедлайна в графике:</div>
                </Col>
                <Col md={2}>
                <div>{studentData.user[0].notification_protection ? "да" : "нет"}</div>
                </Col>
                </Row>
            </div>

            <Row className="justify-content-left">
        <Col>
          <Button variant='dark' className={styles.button_note} onClick={() => handleShowModal('note')}>Сообщить о неточности</Button>
        </Col>
        <Col>
          <Button variant='light' href='/edit_student_profile' className={styles.button_edit_prof} >Редактировать</Button>
        </Col>
      </Row>
      {showModal === 'note' && <NoteModal show={true} handleClose={handleCloseModal}/>}
      {showModal === 'settings' && <SettingsModal show={true} handleClose={handleCloseModal} />}
        </div>
        
     
    )
  }

export default ProfileCard;
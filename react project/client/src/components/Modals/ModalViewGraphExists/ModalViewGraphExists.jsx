import React, { useState, useEffect } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { Row, Col, Button } from 'react-bootstrap';
import styles_base from '../BaseModal/BaseModal.module.css';
import ScheduleTeacher from './ScheduleTeacher';
import { Link } from 'react-router-dom';

function ModalViewGraphExists({ show, handleClose, darkMode, teacherData, requestId }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  console.log(teacherData)
  useEffect(() => {
    console.log("requestId:", requestId);
    console.log("teacherData.request_list:", teacherData.request_list);
    
    const request = teacherData.request_list.find(request => request.id === requestId);
  
    if (request) {
      setRequestDetails(request);
      console.log('заявка есть')
    } else {
      console.log('заявка не найдена');
    }
  }, [teacherData.request_list, requestId]);
  

  const handleScheduleModalOpen = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleModalClose = () => {
    setShowScheduleModal(false);
  };

  const workStages = teacherData.work_schedule_list.filter(stage => stage.request === requestId);

  const request = teacherData.request_list.find(request => request.id === requestId);
  const content = workStages && workStages.length > 0 ? 'Есть этапы работы над ВКР' : 'Этапы работы над ВКР еще не были установлены';


  const footer = workStages  && workStages.length > 0 ? (
    <Row className="justify-content-between px-3">
      <Col md={5}>
        <Button
          variant="none"
          onClick={handleScheduleModalOpen}
          className={styles_base.button_cancel}
        >
          Посмотреть
        </Button>
      </Col>
      <Col md={5}>
        <Button variant="none" className={styles_base.button_next} onClick={handleClose}>
          Отмена
        </Button>
      </Col>
    </Row>
  ) : (
    <Row className="justify-content-between px-3">
      <Col>
        <Link to="/create_schedule_work_fqw">
          <Button variant="none" className={styles_base.button_next} onClick={handleClose}>
            Создать этапы
          </Button>
        </Link>
      </Col>
      <Col md={5}>
        <Button variant="none" className={styles_base.button_next} onClick={handleClose}>
          ОК
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <BaseModal
        show={show}
        handleClose={handleClose}
        title={'Этапы работы над ВКР'}
        content={content}
        darkMode={darkMode}
        footer={footer}
        data={teacherData}
      />
    
      <ScheduleTeacher
        show={showScheduleModal}
        handleClose={handleScheduleModalClose}
        darkMode={false}
        schedule_stud_prof={workStages}
        data={teacherData}
        request={request}
      />
    </>
  );
}

export default ModalViewGraphExists;

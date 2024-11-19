import React, { useState } from 'react';
import styles from './SupervisedStudents.module.css';
import { Row, Col, Button } from 'react-bootstrap';
import ModalViewGraphExists from '../Modals/ModalViewGraphExists/ModalViewGraphExists'; 
import ModalConfirm from '../Modals/ModalConfirm/ModalConfirm';

function SupervisedStudentsCard({ teacherData, darkMode }) {
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleToggleActions = (requestId) => {
    setActiveRequestId(activeRequestId === requestId ? null : requestId);
  };

  const openModalViewTeacherGraph = (request) => {
    setModalData({
      schedule_stud_prof: request.work_schedule_list,
      request_data_task: request,
      teacherData: teacherData
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancelSupervision = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <h4 className="mb-4 text-center">Курируемые выпускники</h4>
      <div className={`${styles.block} ${darkMode ? styles.dark_mode : ''}`}>
        {teacherData.request_list?.map((request) => {
          if (request.is_accepted_request === true) {
            const student = teacherData.student_list.find(student => student.user_id === request.student.id);
            const protection = teacherData.personal_work_protection_list.find(protection => protection.request === request.id);
            const today = new Date();

            const activeSchedule = teacherData.work_schedule_list?.find(schedule => {
                const startDate = new Date(schedule.start);
                const endDate = new Date(schedule.end);
                const isTodayWithinRange = today >= startDate && today <= endDate;
                return schedule.request === request.id && isTodayWithinRange;
            });

            const isScheduleCreated = teacherData.work_schedule_list?.some(schedule => schedule.request === request.id);
            const isAllStagesCompleted = isScheduleCreated && !activeSchedule;
            
            return (
              <div key={request.id}>
                <Row className='justify-content-center'>
                  <Col md={3}>{request.student.last_name} {request.student.first_name} {request.student.patronymic}</Col>
                  <Col md={3}>{student ? student.group.name : ''}</Col>
                  <Col md={3}>{student ? student.average_score : ''}</Col>
                  <Col md={3}>
                    <Button 
                      variant='none' 
                      className={styles.button_actions}
                      onClick={() => handleToggleActions(request.id)}
                    >
                      Действия
                    </Button>
                    {activeRequestId === request.id && (
                      <div className={styles.actions_list}>
                        <button onClick={() => openModalViewTeacherGraph(request)}>График работы над ВКР</button>
                        {
                          request.is_accepted_theme ? (
                            <button>Снять утверждение темы</button>
                          ) : (
                            <button>Запросить тему</button>
                          )
                        }
                        <button onClick={handleCancelSupervision}>Отказаться от курирования</button>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className='justify-content-center'>
                  <Col md={3}>Тема:</Col>
                  <Col md={6}>{request.theme.name}</Col>
                  <Col md={3}></Col>
                </Row>

                <Row className='justify-content-center'>
            <Col md={3}>Этап работы:</Col>
            {isAllStagesCompleted ? (
                <Col md={9}>все этапы пройдены</Col>
            ) : activeSchedule ? (
                <Col md={9}>{activeSchedule.stage_name}</Col>
            ) : (
                <Col md={9}>график не был создан</Col>
            )}
        </Row>
                <Row className='justify-content-center'>
                  <Col md={3}>Дата и время защиты:</Col>
                  {protection ? (
                    <Col md={9}>{protection.personal_time}</Col>
                  ) : (
                    <Col md={9}>график защит ВКР не создан секретарем ГЭК</Col>
                  )}
                </Row>

                <Row className='justify-content-center'>
                  <Col md={3}>Тип ВКР:</Col>
                  <Col md={9}>{request.type_of_fqw}</Col>
                </Row>

                {request.additional_information && (
                  <Row className="justify-content-center">
                    <Col md={3}>Дополнительная информация:</Col>
                    <Col md={9}>{request.additional_information}</Col>
                  </Row>
                )}
                <hr/>
              </div>
            );
          } else {
            return null; 
          }
        })}
      </div>
      {showModal && (
        <ModalViewGraphExists 
          show={showModal} 
          handleClose={handleCloseModal} 
          darkMode={false} 
          teacherData={teacherData}
          requestId={activeRequestId} 
        />
      )}
      {showConfirmationModal && (
        <ModalConfirm
          show={showConfirmationModal}
          handleClose={handleCloseConfirmationModal}
          darkMode={false}
        />
      )}
    </>
  );
}

export default SupervisedStudentsCard;

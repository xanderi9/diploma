import React, { useState } from 'react';
import styles from '../ProfileBlocks.module.css';
import application from './application.png';
import graph from './graph.png';
import form from './form.png';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTooltip from '../../../Tooltip/Tooltip';
import info from '../../../../img/info.png';
import ScheduleFQWModal from '../../../Modals/ScheduleFQWModal/ScheduleFQWModal';

function ActionsCard({ studentData }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState('');

  const handleScheduleModalClose = () => setShowScheduleModal(false);
  const handleActionModalClose = () => setShowActionModal(false);

  const handleActionSelection = (selectedAction) => {
    setAction(selectedAction);
    console.log(selectedAction);
    setShowActionModal(false);
  };
  const handleScheduleModalShow = () => setShowScheduleModal(true);
  const handleActionModalShow = () => setShowActionModal(true);

  return (
    <div className={`${styles.card} actions`}>
      <p className="text-center px-1 py-2 fw-bold">Действия</p>

      <Row className='flex justify-content-center'>
        <Col md={10}>
          <CustomTooltip text="Автоматическая генерация заявлений">
            <h6 className="fw-bold">Генерация документов <img className='mx-2' src={info} width={15} height={15} alt="info" /></h6>
          </CustomTooltip>
        </Col>
        <Col md={1}></Col>
      </Row>

      <Row className='flex justify-content-center mb-1'>
        <Col md={10}>
          <Link onClick={handleActionModalShow}>Заявление на утверждение темы или руководителя ВКР</Link>
        </Col>
        <Col md={1}>
          <img src={application} width="20" height="20" alt="profile_pic" loading="lazy" onClick={handleActionModalShow} />
        </Col>
      </Row>

      <Row className='flex justify-content-center mt-2'>
        <Col md={10}>
          <CustomTooltip text="Если создан руководителем">
            <h6 className="fw-bold"> Действия <img className='mx-2' src={info} width={15} height={15} alt="info" /></h6>
          </CustomTooltip>
        </Col>
        <Col md={1}></Col>
      </Row>

      <Row className='flex justify-content-center mb-1'>
        <Col md={10}>
          <Link to="#" onClick={handleScheduleModalShow}>Посмотреть график работ</Link>
        </Col>
        <Col md={1}>
          <img src={graph} width="20" height="20" alt="profile_pic" loading="lazy" onClick={handleScheduleModalShow} />
        </Col>
      </Row>

      <Row className='flex justify-content-center mt-2'>
        <Col md={10}>
          <CustomTooltip text="Нельзя изменить после редактирования секретарем ГЭК">
            <h6 className="fw-bold">Формы <img className='mx-2' src={info} width={15} height={15} alt="info" /></h6>
          </CustomTooltip>
        </Col>
        <Col md={1}></Col>
      </Row>

      <Row className='flex justify-content-center mb-1'>
        <Col md={10}>
          <Link to='/form_marks_completion'>Заполнить отметки о выполнении</Link>
        </Col>
        <Col md={1}>
          <Link to='/form_marks_completion'>
            <img src={form} width="20" height="20" alt="profile_pic" loading="lazy" />
          </Link>
        </Col>
      </Row>

      <ScheduleFQWModal data={studentData} show={showScheduleModal} handleClose={handleScheduleModalClose} darkMode={false} />

      <Modal show={showActionModal} onHide={handleActionModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Выберите действие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="none" onClick={() => handleActionSelection('approve')}>
            <Link to={`/generate_application?action=approve`}>
              Генерировать заявление на утверждение темы и руководителя ВКР
            </Link>
          </Button>
          <Button variant="none" onClick={() => handleActionSelection('change')}>
            <Link to={`/generate_application?action=change`}>
              Генерировать заявление на изменение темы или руководителя ВКР
            </Link>
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleActionModalClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActionsCard;

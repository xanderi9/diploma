import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styles from '../../ProfileBlocks.module.css';
import reveal from '../../../../img/reveal.png';
import ModalRequests from '../../../Modals/ModalRequests/ModalRequests';
import RequestsContent from './RequestsContent';
import axios from 'axios';

const RequestsCard = () => {
  const [requestData, setRequestData] = useState([]);
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [visibleRequests, setVisibleRequests] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/teacher/request_all/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setRequestData(res.data);
          setStudentList(res.data.student_list);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 

  const filterRequests = (requestData) => {
    if (!requestData || !requestData.request_list) return [];
    
    return requestData.request_list.filter(request =>
      request.is_accepted_request === null ||
      (request.is_accepted_request === true && request.is_accepted_theme === false)
    );
  };
  
  useEffect(() => {
    const filteredRequests = filterRequests(requestData);
    setVisibleRequests(filteredRequests);
  }, [currentRequestIndex, requestData]);

  const handleAccept = () => {
    setVisibleRequests(prevRequests =>
      prevRequests.filter((_, index) => index !== currentRequestIndex)
    );
    setCurrentRequestIndex(0);
  };

  const handleDecline = () => {
    setVisibleRequests(prevRequests =>
      prevRequests.filter((_, index) => index !== currentRequestIndex)
    );
    setCurrentRequestIndex(0);
  };

  const handleModalAccept = (index) => {
    setVisibleRequests(prevRequests =>
      prevRequests.filter((_, i) => i !== index)
    );
  };

  const handleModalDecline = (index) => {
    setVisibleRequests(prevRequests =>
      prevRequests.filter((_, i) => i !== index)
    );
  };

  const currentRequest = visibleRequests[currentRequestIndex];
  const noRequestsLeft = !currentRequest || currentRequestIndex >= visibleRequests.length;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.card}>
      <p className="text-center px-1 py-2 fw-bold">Текущие заявки <span className={styles.badge}>{visibleRequests.length}</span>
        <img src={reveal} className="mx-3" width="20" height="20" onClick={() => setShowModal(true)} alt="reveal" />
      </p>

      {noRequestsLeft ? (
        <p className="text-center">Вам еще не были отправлены заявки</p>
      ) : (
        <div className={styles.request_field}>
          <RequestsContent
            currentRequest={currentRequest}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            studentList={studentList}
          />
        </div>
      )}

      <ModalRequests
        show={showModal}
        handleClose={handleCloseModal}
        requestdata={visibleRequests}
        handleAccept={handleModalAccept}
        handleDecline={handleModalDecline}
        studentList={studentList}
      />
    </div>
  );
}

export default RequestsCard;

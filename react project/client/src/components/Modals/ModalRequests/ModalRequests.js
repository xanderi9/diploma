import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BaseModal from '../BaseModal/BaseModal';
import BlockInfo from '../../BlockInfo/BlockInfo';
import styles from './ModalRequests.module.css';
import RequestsContent from '../../ProfileBlocks/Teacher/RequestsCard/RequestsContent';
import sort from '../../../img/sort.png';

export default function ModalRequests(props) {
  const { show, handleClose, darkMode, handleAccept, handleDecline, requestdata, studentList } = props;
  const [sortedRequests, setSortedRequests] = useState(requestdata);
  const [sortOrder, setSortOrder] = useState({});

  useEffect(() => {
    setSortedRequests(requestdata);
  }, [requestdata]);

  const sortById = () => {
    const order = sortOrder['id'] === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedRequests].sort((a, b) => 
      order === 'asc' ? a.id - b.id : b.id - a.id
    );
    setSortedRequests(sorted);
    setSortOrder({ ...sortOrder, id: order });
  };
  
  const sortByAverageScore = () => {
    const order = sortOrder['average_score'] === 'asc' ? 'desc' : 'asc'; 
    const sorted = [...sortedRequests].sort((a, b) => {
      const scoreA = studentList.find(student => student.user_id === a.student.id)?.average_score || 0;
      const scoreB = studentList.find(student => student.user_id === b.student.id)?.average_score || 0;
      return order === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    });
    setSortedRequests(sorted);
    setSortOrder({ ...sortOrder, average_score: order });
  };

  const sortByType = () => {
    const order = sortOrder['type'] === 'asc' ? 'desc' : 'asc'; 
    const sorted = [...sortedRequests].sort((a, b) => {
      const getType = (request) => {
        if (request.is_accepted_request === null) {
          return 'Курирование';
        } else if (request.is_accepted_request === true && request.is_accepted_theme === false) {
          return 'Смена темы';
        } else {
          return 'Другой тип';
        }
      };
      const typeA = getType(a);
      const typeB = getType(b); 
      return order === 'asc' ? typeB.localeCompare(typeA) : typeA.localeCompare(typeB);
    });
    setSortedRequests(sorted);
    setSortOrder({ ...sortOrder, type: order });
  };

  const content = (
    <div>
      <BlockInfo>
        Вы можете в одностороннем порядке принять или отклонить заявки от выпускников.
        Если Вы принимаете заявку, то можете утвердить тему, поставив галочку в соответствующее окно. 
        Если Вы считаете, что тему нужно подкорректировать, оставьте поле чекбокса пустым.
      </BlockInfo>
      
      <div className="d-flex justify-content-center mb-3">
        <Button variant="none" className={styles.button_sort} onClick={sortById}>
          Сортировать по дате <img src={sort} width={20} height={20}/> 
        </Button>
        <Button variant="none" className={styles.button_sort} onClick={sortByAverageScore}>
          Сортировать по среднему баллу <img src={sort} width={20} height={20}/> 
        </Button>
        <Button variant="none" className={styles.button_sort} onClick={sortByType}>
          Сортировать по типу заявки  <img src={sort} width={20} height={20}/>
        </Button>
      </div>
      
      {sortedRequests.length === 0 ? (
        <p className="text-center">Вам еще не были отправлены заявки</p>
      ) : (
        <>
          {sortedRequests.map((request, index) => (
            <div className={`mx-5 ${styles.request_field}`} key={index}>
              <div className='mx-4'>
                <RequestsContent
                  currentRequest={request}
                  handleAccept={() => handleAccept(index)}
                  handleDecline={() => handleDecline(index)}
                  studentList={studentList}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );

  return (
    <BaseModal 
      show={show}
      modalClass={styles.container_modal}
      handleClose={handleClose}
      title={'Текущие заявки'}
      content={content}
      darkMode={darkMode}
    />
  );
}

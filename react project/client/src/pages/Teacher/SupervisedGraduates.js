import React, { useEffect, useState } from 'react';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import SupervisedStudentsCard from '../../components/SupervisedStudentsCard/SupervisedStudentsCard';
import axios from 'axios';

function SupervisedStudents() {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    document.title = "Курируемые выпускники";
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/teacher/request_all_work_schedule_personal_work_protection/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          console.log(res.data);
          setTeacherData(res.data);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  return (
    <BasePageWithCard isAuthenticated={true}>
      {loading ? <p>Загрузка данных...</p> : <SupervisedStudentsCard teacherData={teacherData} />}
    </BasePageWithCard>
  );
}

export default SupervisedStudents;

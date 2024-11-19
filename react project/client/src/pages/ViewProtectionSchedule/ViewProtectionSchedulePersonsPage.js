import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import ViewProtectionSchedulePersons from '../../components/ProtectionSchedule/ViewProtectionSchedulePersons';

function ViewProtectionSchedulePersonsPage() {
  const [protectionSchedule, setProtectionSchedule] = useState(null);
  const [studentsListForSchedule, setStudentsListForSchedule] = useState([]);
  const [personalSchedule, setPersonalSchedule] = useState([]);
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/v1/main/secretary/big_table/');
        console.log(response.data)
        setProtectionSchedule(response.data.general_work_protection_list);
        setStudentsListForSchedule(response.data.student_list);
        setPersonalSchedule(response.data.personal_work_protection_list);
        setRequest(response.data.request_list);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект будет выполнен только при монтировании компонента

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <BasePageWithCard isAuthenticated={true}>
      <ViewProtectionSchedulePersons
        general_work_protection_list={protectionSchedule}
        students_list_for_schedule={studentsListForSchedule}
        request_list = {request}
        personal_work_protection_list= {personalSchedule}
      />
    </BasePageWithCard>
  );
}

export default ViewProtectionSchedulePersonsPage;

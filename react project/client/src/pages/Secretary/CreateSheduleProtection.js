import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import CreateScheduleProtectionForm from '../../components/Forms/CreateScheduleProtectionForm/CreateScheduleProtectionForm';

function CreateSheduleProtection() {
  const [groupsForSchedule, setGroupsForSchedule] = useState([]);
  const [studentsListForSchedule, setStudentsListForSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/v1/main/groups_students/');
        setGroupsForSchedule(response.data.group_list);
        console.log(response.data)
        setStudentsListForSchedule(response.data.student_list);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <BasePageWithCard isAuthenticated={true}>
      <CreateScheduleProtectionForm 
        groups_for_schedule={groupsForSchedule} 
        students_list_for_schedule={studentsListForSchedule} 
      />
    </BasePageWithCard>
  );
}

export default CreateSheduleProtection;

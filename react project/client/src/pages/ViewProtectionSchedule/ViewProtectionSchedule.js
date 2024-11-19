import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import ViewProtectionScheduleTable from '../../components/ProtectionSchedule/ViewProtectionScheduleTable';

function ViewProtectionSchedule() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/work_protection/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setData(res.data);
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; // Отображаем сообщение "Loading..." во время загрузки данных
  }
 

  return (
    <BasePageWithCard isAuthenticated={true}>
      <ViewProtectionScheduleTable protection_schedule={data} />
    </BasePageWithCard>
  );
}

export default ViewProtectionSchedule;

import React, { useState, useEffect } from 'react';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import StudentRequestView from '../../components/StudentRequestView/StudentRequestView';
import axios from 'axios';

function ViewCreatedRequest({ request }) {
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/student/request/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setRequestData(res.data);
          console.log(res.data)
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
    return <div>Loading...</div>; 
  }

  return (
    <BasePageWithCard isAuthenticated={true}>
      {/* Передаем данные запроса в компонент StudentRequestView */}
      <StudentRequestView request={requestData} />
    </BasePageWithCard>
  );
}

export default ViewCreatedRequest;

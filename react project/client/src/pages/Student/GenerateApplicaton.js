import React, { useState, useEffect } from 'react';
import GenerateApplicationForm from '../../components/Forms/GenerateApplicationForm/GenerateApplicationForm';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import axios from 'axios';

const GenerateApplication = () => {
  const [studentData, setStudentData] = useState([]);
  const [generatingInfo, setGeneratingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Генерация заявления";

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/student/student_request/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setStudentData(res.data);
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(studentData)
  return (
    <BasePageWithCard isAuthenticated={true} >
      <GenerateApplicationForm generating_info={studentData} />
    </BasePageWithCard>
  );
};

export default GenerateApplication;

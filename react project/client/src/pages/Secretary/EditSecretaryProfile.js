import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import EditSecretaryProfileForm from '../../components/Forms/EditProfile/Secretary/EditSecretaryProfileForm';

const EditSecretaryProfile = () => {
  const [secretaryData, setSecretaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecretaryData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/secretary/profile/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setSecretaryData(res.data);
          console.log(res.data)
        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSecretaryData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BasePageWithCard isAuthenticated={true}>
    <EditSecretaryProfileForm secretaryData={secretaryData} />
    </BasePageWithCard>
  );
};

export default EditSecretaryProfile;

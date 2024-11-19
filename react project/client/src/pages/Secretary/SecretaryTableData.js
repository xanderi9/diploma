import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasePageHugeCard from '../BasePages/BasePageHugeCard';
import SecretaryHugeTable from '../../components/Tables/SecretaryTableData/SecretaryHugeTable';

const SecretaryTableData = () => {
  const [secretaryData, setSecretaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecretaryData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/secretary/big_table/', {
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
    <BasePageHugeCard isAuthenticated={true}>
      <SecretaryHugeTable info_for_table={secretaryData} />
    </BasePageHugeCard>
  );
};

export default SecretaryTableData;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard.js';
import GenerateProtocols from '../../components/Forms/GenerateProtocols/GenerateProtocols.js';

const GenerateProtocolsPage = () => {
  const [compositionOfSec, setCompositionOfSec] = useState(null);
  const [groupsForSchedule, setGroupsForSchedule] = useState([]);
  const [requestAndWorkProtection, setRequestAndWorkProtection] = useState([]);
  const [ei, setEI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
          throw new Error('Access token not found');
        }

        axios.defaults.headers.common['Authorization'] = `Token ${accessToken}`;

        const compositionOfSecResponse = await axios.get('http://127.0.0.1:8000/v1/main/composition_Of_SEC/');
        setCompositionOfSec(compositionOfSecResponse.data);
        console.log(compositionOfSecResponse.data)
        const groupsResponse = await axios.get('http://127.0.0.1:8000/v1/main/groups/');
        setGroupsForSchedule(groupsResponse.data);
        console.log(groupsResponse.data)
        const bigTableResponse = await axios.get('http://127.0.0.1:8000/v1/main/secretary/big_table/');
        setRequestAndWorkProtection(bigTableResponse.data);
        console.log(bigTableResponse.data)
        const eiResponse = await axios.get('http://127.0.0.1:8000/v1/main/employee_information/');
        setEI(eiResponse.data);
        console.log('еи', eiResponse.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.title = "Генерация протоколов";
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <BasePageWithCard isAuthenticated={true}>
      <GenerateProtocols
        composition_of_sec={compositionOfSec}
        group_list={groupsForSchedule.group_list}
        request_list={requestAndWorkProtection}
        ei = {ei.employee_information}
      />
    </BasePageWithCard>
  );
};

export default GenerateProtocolsPage;

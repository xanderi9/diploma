import React, { useState, useEffect } from 'react';
import BasePage from '../BasePages/BasePage.js';
import Search from '../../components/ProfileBlocks/Search/Search.js';
import ProfileBlocksSecretary from '../../components/ProfileBlocks/Secretary/ProfileBlocksSecretary/ProfileBlocksSecretary.jsx';
import axios from 'axios';

const ProfileSecretary = () => {
  const [secretaryData, setSecretaryData] = useState([]);
  const [loading, setLoading] = useState(true); // Добавлено состояние для отслеживания загрузки
  const type = localStorage.getItem('type_of_user');
  console.log('тип пользователя', type)
  useEffect(() => {
    const fetchData = async () => {
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
    <BasePage isAuthenticated={true} >
      <Search />
      <ProfileBlocksSecretary secretaryData={secretaryData} />
    </BasePage>
  );
};

export default ProfileSecretary;

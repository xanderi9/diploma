import React, { useState, useEffect } from 'react';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import ThemesListReading from '../../components/Tables/ThemesListReading.js/ThemesListReading';
import axios from 'axios';

function ViewThemesListPage() {
  const [themesList, setThemesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение данных с сервера
        const res = await axios.get('http://127.0.0.1:8000/v1/main/themes/');
        setThemesList(res.data);
      } catch (error) {
        console.error('Error fetching themes:', error);
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
      <ThemesListReading themes_list={themesList}/>
    </BasePageWithCard>
  );
}

export default ViewThemesListPage;

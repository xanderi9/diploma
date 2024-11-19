import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard.js';
import EditThemeListTeacherForm from '../../components/Tables/EditThemeList/Teacher/EditThemeListTeacherForm.js';

const EditThemeListTeacher = () => {
  const [themesList, setThemesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Редактирование списка тем ВКР";
    fetchThemesList();
  }, []);

  const fetchThemesList = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('http://127.0.0.1:8000/v1/main/teacher/themes/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setThemesList(res.data);
        console.log(res.data)
        setIsLoading(false);
      }
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BasePageWithCard isAuthenticated={true}>

      <EditThemeListTeacherForm themesList={themesList} />

    </BasePageWithCard>
  );
};

export default EditThemeListTeacher;

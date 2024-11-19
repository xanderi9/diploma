import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasePageHugeCard from '../BasePages/BasePageHugeCard.js';
import EditThemesListSecretaryForm from '../../components/Tables/EditThemeList/Secretary/EditThemesListSecretaryForm.js';

const EditThemeListSecretary = () => {
  const [themesList, setThemesList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Редактирование списка тем ВКР";

    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      const headers = {
        Authorization: `Bearer ${token}` // Set the token in the headers
      };

      try {
        const [themesResponse, teachersResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/v1/main/themes/', { headers }), // Pass headers in axios request
          axios.get('http://127.0.0.1:8000/v1/main/teachers/', { headers }) // Pass headers in axios request
        ]);

        setThemesList(themesResponse.data);
        console.log(themesResponse.data);
        setTeachersList(teachersResponse.data);
        console.log(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
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
    <BasePageHugeCard isAuthenticated={true}>
      <EditThemesListSecretaryForm themesList={themesList} teachers_list={teachersList} />
    </BasePageHugeCard>
  );
};

export default EditThemeListSecretary;

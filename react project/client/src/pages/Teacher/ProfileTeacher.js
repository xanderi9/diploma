import React, { useState, useEffect } from 'react';
import BasePage from '../BasePages/BasePage.js';
import ProfileBlocksTeacher from '../../components/ProfileBlocks/Teacher/ProfileBlocksTeacher/ProfileBlocksTeacher.js';
import Search from '../../components/ProfileBlocks/Search/Search.js';
import axios from 'axios';

const ProfileTeacher = (props) => {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const type = localStorage.getItem('type_of_user');
  console.log('тип пользователя', type)
  useEffect(() => {
    document.title = "Профиль";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/teacher/profile/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setTeacherData(res.data);
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
  console.log('получили', teacherData)
  const themes_list = teacherData.theme_list_without_teacher;
  return (
    <BasePage isAuthenticated={true} data={teacherData}>
      <Search />
      <ProfileBlocksTeacher data={teacherData} themes_list={themes_list} />
    </BasePage>
  );
};

export default ProfileTeacher;

import React, { useState, useEffect } from 'react';
import BasePage from '../../pages/BasePages/BasePage.js';
import Search from '../../components/ProfileBlocks/Search/Search.js';
import ProfileBlocks from '../../components/ProfileBlocks/Student/ProfileBlocks.js';
import axios from 'axios';
import Loader from '../../components/Loader/Loader.js';


const ProfileStudent = (props) => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token) {
          const res = await axios.get('http://127.0.0.1:8000/v1/main/student/profile/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          
          setStudentData(res.data);
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
    return (
     <Loader/>
    );
  }
 
  return (
    <BasePage isAuthenticated={true} data={studentData}>
      <Search />
      <ProfileBlocks studentData={studentData}/>
    </BasePage>
  );
};

export default ProfileStudent;

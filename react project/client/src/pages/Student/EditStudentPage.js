import React, { Component } from 'react';
import axios from 'axios';
import EditProfileStudentForm from '../../components/Forms/EditProfile/Student/EditProfileStudentForm.js';
import BasePageWithCard from '../BasePages/BasePageWithCard.js';

export default class EditStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      loading: true,
    };
  }

  componentDidMount() {
    document.title = "Редактирование профиля";
    this.fetchStudentData();
  }

  fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('http://127.0.0.1:8000/v1/main/student/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.setState({ studentData: res.data, loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Ошибка при получении данных студента:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { studentData, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Отображаем сообщение "Loading..." во время загрузки данных
    }

    return (
      <BasePageWithCard isAuthenticated={true}>
        <EditProfileStudentForm studentData={studentData} />
      </BasePageWithCard>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import EditTeacherProfile from '../../components/Forms/EditProfile/Teacher/EditTeacherProfile';
import BasePageWithCard from '../BasePages/BasePageWithCard';

export default class EditTeacherPage extends Component {
  state = {
    teacherData: null,
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    document.title = "Редактирование профиля";
    this.fetchTeacherData();
  }

  fetchTeacherData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('http://127.0.0.1:8000/v1/main/teacher/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.setState({ teacherData: res.data, isLoading: false });
        console.log( res.data)
      }
    } catch (error) {
      this.setState({ error: 'Ошибка при загрузке данных', isLoading: false });
    }
  };

  render() {
    const { teacherData, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Загрузка...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <BasePageWithCard isAuthenticated={true}>
        <EditTeacherProfile teacherData={teacherData} />
      </BasePageWithCard>
    );
  }
}

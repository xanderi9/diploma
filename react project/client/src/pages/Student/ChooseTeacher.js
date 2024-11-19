import React, { Component } from 'react';
import axios from 'axios';
import ChooseTeacherCard from '../../components/ChooseTeacher/ChooseTeacherCard';
import BasePageWithCard from '../BasePages/BasePageWithCard';

export default class ChooseTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers_list: [],
      loading: true,
    };
  }

  componentDidMount() {
    document.title = "Выбрать руководителя";
    this.fetchTeachersList();
  }

  fetchTeachersList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/v1/main/teachers/', {
      });
      this.setState({ teachers_list: response.data, loading: false });
      console.log(response.data)
    } catch (error) {
      console.error('Ошибка при получении списка учителей:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { teachers_list, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Отображаем сообщение "Loading..." во время загрузки данных
    }

    return (
      <BasePageWithCard isAuthenticated={true}>
        <ChooseTeacherCard teachers_list={teachers_list} />
      </BasePageWithCard>
    );
  }
}

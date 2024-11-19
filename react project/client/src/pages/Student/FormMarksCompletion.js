import React, { Component } from 'react';
import axios from 'axios';
import BasePageWithCard from '../BasePages/BasePageWithCard';
import MarksCompletionForm from '../../components/Forms/MarksCompletion/MarksCompletionForm';

export default class FormMarksCompletion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    document.title = "Заполнить отметки о выполнении";
    this.fetchStudentData();
  }

  async fetchStudentData() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://127.0.0.1:8000/v1/main/student/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.setState({ studentData: response.data, loading: false });
      } else {
        this.setState({ loading: false, error: 'No token found' });
      }
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  render() {
    const { studentData, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <BasePageWithCard isAuthenticated={true}>
        <MarksCompletionForm studentData={studentData} />
      </BasePageWithCard>
    );
  }
}

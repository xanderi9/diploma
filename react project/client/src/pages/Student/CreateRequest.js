import React, { Component } from 'react';
import axios from 'axios';
import RequestCard from '../../components/Forms/RequestCard/RequestCard';
import BasePageWithCard from '../BasePages/BasePageWithCard';

export default class CreateRequest extends Component {
  state = {
    requestData: null,
    loading: true,
  };

  componentDidMount() {
    document.title = 'Подача заявки';
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('http://127.0.0.1:8000/v1/main/student/student_request_formation/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.setState({ requestData: res.data, loading: false });
        console.log(res.data)
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Error fetching request data', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { requestData, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <BasePageWithCard isAuthenticated={true} data={requestData}>
        <RequestCard requestData={requestData} />
      </BasePageWithCard>
    );
  }
}

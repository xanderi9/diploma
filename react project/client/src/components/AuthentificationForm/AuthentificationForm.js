import React, { Component } from 'react';
import { Button, Container, Row, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import styles from './AutentificationForm.module.css';
import enter from './enter.png';
import { BrowserRouter as Router, Routes, Link, Route, Navigate } from 'react-router-dom';

export default class AuthentificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: null,
      error: null,
      type_of_user: '',
    };
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await axios.post('http://127.0.0.1:8000/v1/authentication/login/', {
        username,
        password,
      });
      this.setState({ token: response.data.token,type_of_user: response.data.type_of_user[0].name });
     
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('type_of_user', response.data.type_of_user[0].name);
      localStorage.setItem('last_name', response.data.last_name);
      localStorage.setItem('first_name', response.data.first_name);
      localStorage.setItem('patronymic', response.data.patronymic);
      console.log(response.data.token)
      console.log(response.data)

    } catch (error) {
      this.setState({ error: 'Неверные логин или пароль' });
    }
  };

  render() {
    let loginPath;
    const { token, error, type_of_user  } = this.state;
    const userRole = type_of_user;
    switch (userRole) {
      case 'Выпускник':
        loginPath = '/profile_student';
        break;
      case 'Руководитель':
        loginPath = '/profile_teacher';
        break;
      case 'Секретарь ГЭК':
        loginPath = '/profile_secretary';
        break;
      default:
        loginPath = '/';
    }

    const darkMode = this.props.darkMode;

    if (token) {
      return <Navigate to={loginPath} />;
    }

    return (
      <div className={styles.container}>
        <div className={`${styles.card_fone} ${darkMode ? styles.dark_mode : ''}`}>
          <Row>
            <Col md={6} className="mt-4">
              <h4 className="text-center mb-4">Авторизоваться</h4>
              <div className={`text-center py-4 ${styles.auth_form_left} ${darkMode ? styles.dark_mode : ''}`}>
                <Form className="py-5 px-1" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={styles.auth_form_input}
                      id="username"
                      placeholder="Логин"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={styles.auth_form_input}
                      id="password"
                      placeholder="Пароль"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  {error && <div className={styles.error}>{error}</div>}
                  <button type="submit" className={`text-center p-3 ${styles.button34} ${darkMode ? styles.dark_mode : ''}`}>
                    Войти
                  </button>
                </Form>
              </div>
            </Col>
            <Col md={6} className="align-items-center">
              <div className={`text-center p-3 ${styles.auth_form_right} ${darkMode ? styles.dark_mode : ''}`}>
                <img src={enter} className={styles.enter} width="70%" alt="Icon" loading="lazy" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

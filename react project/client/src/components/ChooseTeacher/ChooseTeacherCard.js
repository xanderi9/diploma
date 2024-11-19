import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './ChooseTeacher.module.css';
import { Link } from "react-router-dom";

export default class ChooseTeacherCard extends Component {
  render() {
    const { teachers_list } = this.props;
    console.log(teachers_list)
    if (!teachers_list.teachers_list ||  teachers_list.teachers_list.length === 0) {
      return (
        <div>
          <h4 className="mb-4 text-center">Выбрать руководителя</h4>
          <h6 className='text-center'>Нет данных о преподавателях</h6>
        </div>
      );
    }

    return (
      <Row className="justify-content-center">
        <Col md={10}>
          <h4 className="mb-4 text-center">Выбрать руководителя</h4>
          <table className={styles.teachers_list} width="100%" cellPadding="7">
            <thead>
              <tr>
                <th width="35%">ФИО</th>
                <th width="37%">Количество вакантных мест</th>
                <th>Подать заявку</th>
              </tr>
            </thead>
            <tbody>
              {teachers_list.teachers_list.map((teacher, index) => (
                <tr key={index}>
                  <td>{`${teacher.user.last_name} ${teacher.user.first_name} ${teacher.user.patronymic}`}</td>
                  <td>{teacher.number_of_vacancies}</td>
                  <td>
                    <Button variant="link" className={styles.button_choose_teacher}>
                      <Link to={`/create_request/${encodeURIComponent(`${teacher.user.last_name} ${teacher.user.first_name} ${teacher.user.patronymic}`)}`}>
                        Подать заявку
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    );
  }
}

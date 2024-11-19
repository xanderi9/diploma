import React, { useState } from 'react';
import { Table, Col, Row, Button } from 'react-bootstrap';
import styles from './ThemeListReading.module.css'
import {Link} from 'react-router-dom'

function ThemesListReading({themes_list }) {
  const [filter, setFilter] = useState('');
  console.log(themes_list)
  const type_of_user = localStorage.getItem('type_of_user');
  const filteredThemes = themes_list.theme_list.filter((theme) => {
    if (!filter) {
      return true;
    }
  
    const teacherName = theme.teacher !== null ?
      `${theme.teacher.last_name} ${theme.teacher.first_name} ${theme.teacher.patronymic}` : 
      theme.by_student === false ? ( 'Кафедра СИИ') : ('Предложена студентом')
     ;

    return (
      teacherName.toLowerCase().includes(filter.toLowerCase()) &&
      !(filter.toLowerCase().startsWith('СИИ') && theme.by_student)
    );
  });
  

  return (
    <div>
      <Row className='text-center'>
        <Col md={9} sm={6}>
          <h4 className='text-center'>Список тем</h4>
        </Col>
        {(type_of_user === 'Руководитель' || type_of_user=== 'Секретарь ГЭК') && (
          <Col md={2}>
        {(type_of_user=== 'Секретарь ГЭК') && (
        <Link to='/edit_theme_list_secretary'>
        <Button variant='none' className={styles.button1}> Редактировать</Button>
        </Link>
        )}
                    {(type_of_user=== 'Руководитель') && (
        <Link to='/edit_theme_list_teacher'>
        <Button variant='none' className={styles.button1}> Редактировать</Button>
        </Link>
        )} 
          </Col>
        )}
      </Row>

      <div className='mx-2 mt-4'>
        <input
          type='text'
          className='form-control mb-3'
          placeholder='Фильтр по ФИО преподавателя или кафедре'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th style={{ width: '20%' }}>Название</th> {/* Устанавливаем ширину столбца с темами */}
              <th>Преподаватель</th>
              <th style={{ width: '25%' }}>Организация</th> {/* Устанавливаем ширину столбца с организацией */}
              <th style={{ width: '13%' }}>Рецензент</th>
              <th>ВКР по заявке</th>
              <th>Свободна</th>
              <th>Предложена студентом</th>
            </tr>
          </thead>
          <tbody>
            {filteredThemes.map((theme) => (
              <tr key={theme.id}>
                <td>{theme.id}</td>
                <td>{theme.name}</td>
                <td>
                  {theme.teacher !== null ?
                    `${theme.teacher.last_name} ${theme.teacher.first_name} ${theme.teacher.patronymic}` :
                    theme.by_student ? 'Предложена студентом' : 'Кафедра СИИ'
                  }
                </td>
                <td>
                  {theme.company && (
                    <>
                      <div>Название: {theme.company.name ? theme.company.name : ''}</div>
                      <div>
                        Ответственный: {theme.company.last_name_of_responsible}{' '}
                        {theme.company.first_name_of_responsible} {theme.company.patronymic_of_responsible}
                      </div>
                      <div>Должность: {theme.company.job_title_of_responsible}</div>
                      <div>Дополнительная информация: {theme.company.additional_information}</div>
                    </>
                  )}
                </td>
                <td>
                  {theme.reviewer !== null ?
                    `${theme.reviewer.last_name} ${theme.reviewer.first_name} ${theme.reviewer.patronymic}` :
                    'Не назначен'
                  }
                </td>
                <td>{theme.fqw_by_application}</td>
                <td>{theme.free ? 'Да' : 'Нет'}</td>
                <td>{theme.by_student ? 'Да' : 'Нет'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ThemesListReading;

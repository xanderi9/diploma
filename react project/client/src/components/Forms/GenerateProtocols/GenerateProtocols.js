import React, { useState } from 'react';
import { Table, Col, Row, Button, Form } from 'react-bootstrap';
import generateProtocolsFunction from './GenerateProtocolFunction';
import styles from '../FormsBase.module.css';
import GenerateProtocolsKvalif from './GenerateProtocolsKvalif';

function GenerateProtocols({ composition_of_sec, group_list, request_list, ei }) {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedGroupStudents, setSelectedGroupStudents] = useState([]);

  // Функция для подсчета числа студентов в каждой группе
  const countStudentsPerGroup = () => {
    const studentCounts = {};
    // Проверяем, что request_list.student_list является массивом
    if (Array.isArray(request_list.student_list)) {
      request_list.student_list.forEach(student => {
        const groupName = student.group.name;
        if (studentCounts[groupName]) {
          studentCounts[groupName]++;
        } else {
          studentCounts[groupName] = 1;
        }
      });
    }
    return studentCounts;
  };

  const studentCounts = countStudentsPerGroup();

  // Сортировка групп по названию от меньшего к большему
  const sortedGroupList = group_list.sort((a, b) => a.name.localeCompare(b.name));

  // Обработчик изменения выбранной группы
  const handleGroupChange = (groupName) => {
    const students = request_list.student_list.filter(student => student.group.name === groupName);
    setSelectedGroup(groupName);
    setSelectedGroupStudents(students);
  };

  const handleClick = async () => {
    const groupData = request_list.student_list.filter(item => item.group.name === selectedGroup);
    await generateProtocolsFunction({
      composition_of_sec: composition_of_sec,
      selectedGroup: selectedGroup,
      groupData: groupData,
  
      requests: request_list,
      group_list: group_list,
      ei
    });
  };

  const handleClick2 = async () => {
    const groupData = request_list.student_list.filter(item => item.group.name === selectedGroup);
    await GenerateProtocolsKvalif({
      composition_of_sec: composition_of_sec,
      selectedGroup: selectedGroup,
      groupData: groupData,
  
      requests: request_list,
      group_list: group_list,
      ei
    });
  };

  return (
    <div>
      <h4 className='text-center'>Генерация протоколов</h4>
      <Form>
        <Row className='justify-content-center'>
          <Col md={7}>
            <Form.Group controlId="groupSelect">
              <Form.Label>Выберите группу</Form.Label>
              <Form.Control as="select" value={selectedGroup} onChange={(e) => handleGroupChange(e.target.value)}>
                <option value="">Не выбрано</option>
                {sortedGroupList.map(group => (
                  <option key={group.id} value={group.name}>
                    {group.name} ({studentCounts[group.name] || 0} чел.)
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {selectedGroup && (
              <Row className='justify-content-center my-3'>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedGroupStudents.map((student, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.user.last_name}</td>
                          <td>{student.user.first_name}</td>
                          <td>{student.user.patronymic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </Col>
          <Col md={3}>
            Выберите группу и система сгенерирует протоколы на всю группу. Номер, дата протокола и время выступления будут совпадать с временем, обозначенным на странице пофамильного расписания защит ВКР.
          </Col>
        </Row>
      </Form>
      <Row className='justify-content-center my-3'>
        <Col md={3}>
          <Button variant='light' className={styles.button17} onClick={handleClick} disabled={!selectedGroup}>Протокол о защите ВКР</Button>
        </Col>
        <Col md={3}>
          <Button variant='light' className={styles.button17} onClick={handleClick2} disabled={!selectedGroup}>
            Протокол о присвоении квалификации</Button>
        </Col>
      </Row>
    </div>
  );
}

export default GenerateProtocols;

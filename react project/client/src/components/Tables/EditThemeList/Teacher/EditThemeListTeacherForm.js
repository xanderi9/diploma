import React, { useState } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import plus from '../../../../img/plus.png';
import del from '../../../../img/del.png';
import edit from '../../../../img/edit.png';
import styles from './EditThemeList.module.css';

const EditThemeListTeacherForm = ({ themesList: initialThemesList, data }) => {
  const [themesList, setThemesList] = useState(initialThemesList.teacher_theme_list || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [editFormVisibleIndex, setEditFormVisibleIndex] = useState(null);
  const [isLinked, setIsLinked] = useState(false);

  const addRow = () => {
    const newRow = {
      id: themesList.length ? Math.max(...themesList.map(item => item.id)) + 1 : 1,
      name: '',
      teacher: data, // Устанавливаем текущего пользователя в качестве преподавателя
      company: null,
      department: null,
      free: true,
      fqw_by_application: null,
      reviewer: null,
      by_student: false,
    };
    setThemesList([newRow, ...themesList]);
    setEditingIndex(newRow.id);
    setEditingData(newRow);
    setEditFormVisibleIndex(newRow.id);
  };

  const handleSave = () => {
    const updatedThemesList = themesList.map(item =>
      item.id === editingIndex ? { ...item, ...editingData } : item
    );
    setThemesList(updatedThemesList);
    setEditFormVisibleIndex(null);
    setEditingIndex(null);
    setEditingData(null);
  };

  const handleEditClick = (index) => {
    const themeToEdit = themesList.find(item => item.id === index);
    setEditingIndex(index);
    setEditingData(themeToEdit);
    setEditFormVisibleIndex(index);
    setIsLinked(!!themeToEdit.company);
  };

  const handleCancel = () => {
    if (editingIndex === null) {
      setThemesList(themesList.filter(item => item.id !== editingIndex));
    }
    setEditFormVisibleIndex(null);
    setEditingIndex(null);
    setEditingData(null);
  };

  const handleDeleteClick = (index) => {
    setThemesList(themesList.filter(item => item.id !== index));
    if (editFormVisibleIndex === index) {
      setEditFormVisibleIndex(null);
    }
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingData({
      ...editingData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setEditingData({
      ...editingData,
      company: {
        ...editingData.company,
        [name]: value,
      },
    });
  };

  const handleReviewerChange = (e) => {
    const { name, value } = e.target;
    setEditingData({
      ...editingData,
      reviewer: {
        ...editingData.reviewer,
        [name]: value,
      },
    });
  };

  const handleRadioChange = (value) => {
    setIsLinked(value === 'yes');
    if (value === 'no') {
      setEditingData({
        ...editingData,
        company: null,
      });
    }
  };

  return (
    <>
      <h4 className="mb-4 text-center">Редактирование списка тем ВКР</h4>
   
      <Table  width={70} className={`${styles.table_themes} `}>
        <thead className="text-center">
          <tr>
            <th width="40%" rowSpan="2">Наименование темы ВКР</th>
            <th width="20%" colSpan="4" className="no-filter">Организация</th>
            <th rowSpan="2" width="5%">ВКР по заявке</th>
            <th rowSpan="2" width="5%">Ревьювер</th>
            <th rowSpan="2" width="5%">Свободна</th>
            <th rowSpan="2" width="5%" className="no-filter">Действия</th>
            <th rowSpan="2" width="5%" className="no-filter">
              <img id="addRowButton" src={plus} onClick={addRow} width="30" height="30" alt="Add Row" />
            </th>
          </tr>
          <tr>
            <th>Наименование</th>
            <th>Ответственный</th>
            <th>Должность</th>
            <th>Дополнительно</th>
          </tr>
        </thead>
        <tbody>
          {themesList.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.company ? item.company.name : ''}</td>
                <td>{item.company ? `${item.company.last_name_of_responsible || ''} ${item.company.first_name_of_responsible || ''} ${item.company.patronymic_of_responsible || ''}` : ''}</td>
                <td>{item.company ? item.company.job_title_of_responsible : ''}</td>
                <td>{item.company ? item.company.additional_information : ''}</td>
                <td>{item.fqw_by_application}</td>
                <td>{item.reviewer ? `${item.reviewer.last_name || ''} ${item.reviewer.first_name || ''} ${item.reviewer.patronymic || ''}` : ''}</td>
                <td>{item.free ? 'Да' : 'Нет'}</td>
                <td>
                  <img className="action-button mx-2" src={edit} onClick={() => handleEditClick(item.id)} width="20" height="20" alt="edit" />
                  <img className="action-button mx-2" src={del} onClick={() => handleDeleteClick(item.id)} width="20" height="20" alt="delete" />
                </td>
              </tr>
              {editFormVisibleIndex === item.id && (
                <tr>
                  <td colSpan="9">
                    <Form className="py-2 my-2 mx-5">
                      <Form.Group as={Row}>
                        <Form.Label column sm={4}>Тема ВКР</Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            name="name"
                            value={editingData.name}
                            onChange={handleInputChange}
                            placeholder="Тема ВКР"
                            className={styles.block_form}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="reviewer">
                        <Form.Label column sm={4}>ФИО рецензента</Form.Label>
                        <Col sm={8} className="d-flex">
                          <Form.Control
                            type="text"
                            name="last_name"
                            value={editingData.reviewer ? editingData.reviewer.last_name : ''}
                            onChange={handleReviewerChange}
                            placeholder="Фамилия рецензента"
                            className={`${styles.block_form} mr-2`}
                          />
                          <Form.Control
                            type="text"
                            name="first_name"
                            value={editingData.reviewer ? editingData.reviewer.first_name : ''}
                            onChange={handleReviewerChange}
                            placeholder="Имя рецензента"
                            className={`${styles.block_form} mr-2`}
                          />
                          <Form.Control
                            type="text"
                            name="patronymic"
                            value={editingData.reviewer ? editingData.reviewer.patronymic : ''}
                            onChange={handleReviewerChange}
                            placeholder="Отчество рецензента"
                            className={styles.block_form}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="organization_link">
                        <Form.Label column sm={4}>Связь темы ВКР с организацией</Form.Label>
                        <Col sm={4} className="d-flex align-items-center justify-content-between">
                          <Form.Check
                            type="radio"
                            name="have_organization"
                            value="no"
                            label="Не связана"
                            className="mr-2"
                            checked={!isLinked}
                            onChange={() => handleRadioChange('no')}
                          />
                          <Form.Check
                            type="radio"
                            name="have_organization"
                            value="yes"
                            label="Связана"
                            className="ml-2"
                            checked={isLinked}
                            onChange={() => handleRadioChange('yes')}
                          />
                        </Col>
                      </Form.Group>
                      {isLinked && (
                        <>
                          <Form.Group as={Row} controlId="organization_name_field">
                            <Form.Label column sm={4}>Наименование организации</Form.Label>
                            <Col sm={8}>
                              <Form.Control
                                type="text"
                                name="name"
                                value={editingData.company ? editingData.company.name : ''}
                                onChange={handleCompanyChange}
                                placeholder="Введите наименование организации"
                                className={styles.block_form}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} controlId="fio_responsible_field">
                            <Form.Label column sm={4}>ФИО ответственного</Form.Label>
                            <Col sm={8} className="d-flex">
                              <Form.Control
                                type="text"
                                name="last_name_of_responsible"
                                value={editingData.company ? editingData.company.last_name_of_responsible : ''}
                                onChange={handleCompanyChange}
                                className={`${styles.block_form} mr-2`}
                                placeholder="Фамилия ответственного"
                              />
                              <Form.Control
                                type="text"
                                name="first_name_of_responsible"
                                value={editingData.company ? editingData.company.first_name_of_responsible : ''}
                                onChange={handleCompanyChange}
                                className={`${styles.block_form} mr-2`}
                                placeholder="Имя ответственного"
                              />
                              <Form.Control
                                type="text"
                                name="patronymic_of_responsible"
                                value={editingData.company ? editingData.company.patronymic_of_responsible : ''}
                                onChange={handleCompanyChange}
                                className={styles.block_form}
                                placeholder="Отчество ответственного"
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} controlId="post_responsible_field">
                            <Form.Label column sm={4}>Должность ответственного</Form.Label>
                            <Col sm={8}>
                              <Form.Control
                                type="text"
                                name="job_title_of_responsible"
                                value={editingData.company ? editingData.company.job_title_of_responsible : ''}
                                onChange={handleCompanyChange}
                                className={styles.block_form}
                                placeholder="Должность ответственного"
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} controlId="additional_responsible">
                            <Form.Label column sm={4}>Дополнительно</Form.Label>
                            <Col sm={8}>
                              <Form.Control
                                type="text"
                                name="additional_information"
                                value={editingData.company ? editingData.company.additional_information : ''}
                                onChange={handleCompanyChange}
                                className={styles.block_form}
                                placeholder="Дополнительная информация"
                              />
                            </Col>
                          </Form.Group>
                        </>
                      )}
                      <Form.Group as={Row} controlId="fqw_by_application">
                        <Form.Label column sm={4}>FQW by application</Form.Label>
                        <Col sm={8}>
                          <Form.Select
                            name="fqw_by_application"
                            value={editingData.fqw_by_application || ''}
                            onChange={handleInputChange}
                            className={styles.block_form}
                          >
                            <option value="">Выберите...</option>
                            <option value="Предприятия">Предприятия</option>
                            <option value="Подразделения СФУ">Подразделения СФУ</option>
                          </Form.Select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="isFree">
                        <Form.Label column sm={4}>Свободна</Form.Label>
                        <Col sm={8}>
                          <Form.Check
                            type="checkbox"
                            name="free"
                            checked={editingData.free}
                            onChange={handleInputChange}
                            className={styles.checkbox_style}
                          />
                        </Col>
                      </Form.Group>
                      <Row className='justify-content-center'>
                        <Col md={4}>
                          <Button variant="none" className={styles.button1} onClick={handleCancel}>
                            Отмена
                          </Button>
                        </Col>
                        <Col md={4}>
                          <Button variant="none" className={styles.button2} onClick={handleSave}>
                            Сохранить
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

    </>
  );
};

export default EditThemeListTeacherForm;

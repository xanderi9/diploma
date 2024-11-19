import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import plus from '../../../../img/plus.png';
import del from '../../../../img/del.png';
import edit from '../../../../img/edit.png';
import styles from '../Teacher/EditThemeList.module.css';

const EditThemesListSecretaryForm = ({ themesList: initialThemesList, data, teachers_list }) => {
  const [themesList, setThemesList] = useState(initialThemesList.theme_list || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [editFormVisibleIndex, setEditFormVisibleIndex] = useState(null);
  const [isLinked, setIsLinked] = useState(false);
  const [filterAuthor, setFilterAuthor] = useState('');

  const [authorType, setAuthorType] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  console.log('учителя' , teachers_list)
  const addRow = () => {
    const newRow = {
      id: themesList.length ? Math.max(...themesList.map(item => item.id)) + 1 : 1,
      name: '',
      teacher: {
        user: data // Устанавливаем текущего пользователя в качестве преподавателя
      },
      company: {
        name: '',
        last_name_of_responsible: '',
        first_name_of_responsible: '',
        patronymic_of_responsible: '',
        job_title_of_responsible: '',
        additional_information: '',
      },
      free: true,
      fqw_by_application: '',
      reviewer: {
          id: null,
          last_name: null,
          first_name: null,
          patronymic: null
      },
      by_student: false,
      department: false,
    };



    
    const updatedThemesList = [newRow, ...themesList];
    setThemesList(updatedThemesList);
    setEditingIndex(newRow.id);
    setEditingData(newRow);
    setAuthorType('');
  };

  const handleSave = () => {
    const updatedThemesList = themesList.map(item =>
      item.id === editingIndex ? { ...item, ...editingData } : item
    );
    setThemesList(updatedThemesList);
    setEditFormVisibleIndex(null); // Устанавливаем null, чтобы скрыть форму редактирования
    setEditingIndex(null);
    setEditingData(null);
  };

  const handleFilterAuthorChange = (e) => {
    setFilterAuthor(e.target.value);
  };

  const filteredThemesList = themesList.filter(item => {
    const filterText = filterAuthor.toLowerCase();
  
    const startsWith = (text, filter) => text.toLowerCase().startsWith(filter);
  
    if (!filterText) {
      return true;
    } else if (!item.teacher && !item.by_student && !item.department) {
      return startsWith('каф', filterText); 
    } else if (item.teacher && item.teacher.first_name && item.teacher.last_name && item.teacher.patronymic) {

      const fullName = `${item.teacher.last_name} ${item.teacher.first_name} ${item.teacher.patronymic}`;
      return startsWith(fullName, filterText);
    } else if (item.by_student && (startsWith('предложено студентом', filterText) || startsWith('студент', filterText) || startsWith('студ', filterText))) {

      return true;
    } else if (item.department) {

      const departmentKeywords = ['сии', 'кафедра сии', 'кафедра', 'каф'];
      return departmentKeywords.some(keyword => startsWith(keyword, filterText));
    } else {
      return false; 
    }
  });
  
  
  
  
  
  

  const handleEditClick = (index) => {
    const themeToEdit = themesList.find(item => item.id === index);
    if (themeToEdit) {
      setEditingIndex(index);
      setEditingData(themeToEdit);
      setEditFormVisibleIndex(index);
      setIsLinked(!!themeToEdit.company && !!themeToEdit.company.name);
      setAuthorType(
        themeToEdit.by_student ? 'student' :
        themeToEdit.department ? 'department' :
        'teacher'
      );
    } else {
      console.error(`Theme with id ${index} not found in themesList.`);
    }
  };
  
  

  const handleCancel = () => {
    setEditFormVisibleIndex(null);
    if (editingIndex === null) {
      const newData = themesList.filter(item => item.id !== editingIndex);
      setThemesList(newData);
    }
    setEditingIndex(null);
  };

  const handleDeleteClick = (index) => {
    const newData = themesList.filter(item => item.id !== index);
    setThemesList(newData);
    if (editFormVisibleIndex === index) {
      setEditFormVisibleIndex(null);
    }
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedEditingData = {
      ...editingData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setEditingData(updatedEditingData);
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    const updatedEditingData = {
      ...editingData,
      company: {
        ...editingData.company,
        [name]: value,
      },
    };
    setEditingData(updatedEditingData);
  };

  const handleReviewerChange = (e) => {
    const { name, value } = e.target;
    const updatedReviewer = {
      ...editingData.reviewer,
      [name]: value,
    };
    const updatedEditingData = {
      ...editingData,
      reviewer: updatedReviewer,
    };
    setEditingData(updatedEditingData);
  };
  
  

  const handleRadioChange = (value) => {
    setIsLinked(value === 'yes');
    if (value === 'no') {
      // Если выбрана опция "Нет", очищаем поля организации
      const updatedEditingData = {
        ...editingData,
        company: {
          name: '',
          last_name_of_responsible: '',
          first_name_of_responsible: '',
          patronymic_of_responsible: '',
          job_title_of_responsible: '',
          additional_information: '',
        },
      };
      setEditingData(updatedEditingData);
    }
  };

  const handleTeacherSelectChange = (e) => {
    const teacherId = e.target.value;
    const selectedTeacher = teachers_list.teachers_list.find(teacher => teacher.user.id === parseInt(teacherId));
  
    // Установите выбранного преподавателя в состояние selectedTeacher
    setSelectedTeacher(selectedTeacher);
  
    const updatedEditingData = {
      ...editingData,
      teacher: {
        user: selectedTeacher.user
      }
    };
  
    setEditingData(updatedEditingData);
  };
  
  
  // В обработчике изменения типа автора
  const handleAuthorTypeChange = (e) => {
    const { value } = e.target;
    setAuthorType(value);
    
    // Сбрасываем выбранных преподавателя, если тип автора изменен
    setSelectedTeacher(null);
    
    // Устанавливаем соответствующие флаги в зависимости от выбранного типа автора
    switch (value) {
      case 'teacher':
        setEditingData(prevState => ({
          ...prevState,
          by_student: false,
          department: false
        }));
        break;
      case 'department':
        setEditingData(prevState => ({
          ...prevState,
          by_student: false,
          department: true
        }));
        break;
      case 'student':
        setEditingData(prevState => ({
          ...prevState,
          by_student: true,
          department: false
        }));
        break;
      default:
        break;
    }
  };
  
  const getTeacherName = (item) => {
    if (item.teacher && item.teacher.user) {
      return `${item.teacher.user.last_name} ${item.teacher.user.first_name} ${item.teacher.user.patronymic}`;
    } else if (item.by_student) {
      return 'Предложено студентом';
    } else if (item.department) {
      return 'Кафедра СИИ';
    } else {
      return ''; // Для новых записей без автора
    }
  };
  
  
  
  

  return (
    <>
      <h4 className="mb-4 text-center">Редактирование списка тем ВКР</h4>
      <Form.Group as={Row} controlId="filterAuthor" className="justify-content-center">
        <Form.Label column sm={2} className="text-center my-3">Фильтр по автору</Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            value={filterAuthor}
            onChange={handleFilterAuthorChange}
            placeholder="Введите имя автора для фильтрации"
            className={styles.block_form}
          />
        </Col>
      </Form.Group>

      <div className={styles.catch}>
        <table className={styles.table_themes}>
          <thead className="text-center">
            <tr>
              <th rowSpan="2" width="10%">Автор</th>
              <th rowSpan="2" width="50%">Наименование темы ВКР</th>
              <th colSpan="4" className="no-filter">Организация</th>
              <th rowSpan="2" width="5%">ВКР по заявке</th>
              <th rowSpan="2" width="5%">Ревьювер</th>
              <th rowSpan="2">Занята</th>
              <th rowSpan="2" className="no-filter">Действия</th>
              <th className="no-filter">
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
            {filteredThemesList.map((item) => (
              <React.Fragment key={item.id}>
                <tr>
                <td>
  {getTeacherName(item)}
</td>

                  <td>{item.name}</td>
                  <td>{ item.company ? item.company.name : ''}</td>
                  <td>{item.company ? item.company.last_name_of_responsible : ''} {item.company ? item.company.first_name_of_responsible : ''} { item.company ?item.company.patronymic_of_responsible : ''}</td>
                  <td>{item.company ? item.company.job_title_of_responsible : ''}</td>
                  <td>{item.company ? item.company.additional_information : ''}</td>
                  <td>{item.fqw_by_application}</td>
                  <td>{item.reviewer ? item.reviewer.last_name: ''} {item.reviewer ? item.reviewer.first_name: ''} {item.reviewer ? item.reviewer.patronymic:''}</td>
                  <td>{item.free ? 'Нет' : 'Да'}</td>
                  <td>
                    <img src={edit} onClick={() => handleEditClick(item.id)} width="20" height="20" alt="Edit" />
                    <img src={del} onClick={() => handleDeleteClick(item.id)} width="20" height="20" alt="Delete" />
                  </td>
                </tr>
                {editFormVisibleIndex === item.id && (
                  <tr>
                    <td colSpan="10">
                    <Form className="py-2 my-2 mx-5">
                    <Form.Group as={Row} controlId="authorType">
  <Form.Label column sm={4}>Тип автора</Form.Label>
  <Col sm={8}>
    <Form.Select
      value={authorType}
      onChange={handleAuthorTypeChange}
      className={styles.block_form}
    >
      <option value="">Выберите тип автора</option>
      <option value="teacher">Руководитель</option>
      <option value="department">Кафедра СИИ</option>
      <option value="student">Предложена студентом</option>
    </Form.Select>
  </Col>
</Form.Group>
</Form>
{authorType === 'teacher' && (
  <Form className="py-2 my-2 mx-5">
  <Form.Group as={Row} controlId="teacherSelect" >
    <Form.Label column sm={4}>Выберите преподавателя</Form.Label>
    <Col sm={8}>
    <Form.Select
  value={selectedTeacher ? selectedTeacher.user.id : ''}
  onChange={handleTeacherSelectChange}
  className={styles.block_form}
>
  <option value="">Выберите преподавателя...</option>
  {teachers_list.teachers_list.map(teacher => (
    <option key={teacher.user.id} value={teacher.user.id}>
      {`${teacher.user.last_name} ${teacher.user.first_name} ${teacher.user.patronymic}`}
    </option>
  ))}
</Form.Select>

    </Col>
  </Form.Group>
  </Form>
)}


                      <Form className="py-2 my-2 mx-5">
                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>Тема ВКР</Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              name="name"
                              value={editingData.name}
                              onChange={handleInputChange}
                              placeholder="тема ВКР"
                              className={styles.block_form}
                            />
                          </Col>
                        </Form.Group>
                      
                        <Form.Group as={Row} controlId="reviewer">
  <Form.Label column sm={4}>
    Рецензент
  </Form.Label>
  <Col sm={8} className="d-flex align-items-center">
    <Form.Control
      type="text"
      name="last_name"
      value={editingData.reviewer ? editingData.reviewer.last_name || '' : ''}
      onChange={handleReviewerChange}
      placeholder="Фамилия рецензента"
      className={`${styles.block_form} mr-2`}
    />
    <Form.Control
      type="text"
      name="first_name"
      value={editingData.reviewer ? editingData.reviewer.first_name || '' : ''}
      onChange={handleReviewerChange}
      placeholder="Имя рецензента"
      className={`${styles.block_form} mr-2`}
    />
    <Form.Control
      type="text"
      name="patronymic"
      value={editingData.reviewer ? editingData.reviewer.patronymic || '' : ''}
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
                              onChange={() => handleRadioChange('no')} // Обработчик для опции "Нет"
                            />
                            <Form.Check
                              type="radio"
                              name="have_organization"
                              value="yes"
                              label="Связана"
                              className="ml-2"
                              checked={isLinked}
                              onChange={() => handleRadioChange('yes')} // Обработчик для опции "Да"
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
      value={editingData.company ? editingData.company.name || '' : ''}
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
      value={editingData.company ? editingData.company.last_name_of_responsible || '' : ''}
      onChange={handleCompanyChange}
      className={`${styles.block_form} mr-2`}
      placeholder="Фамилия ответственного"
    />
    <Form.Control
      type="text"
      name="first_name_of_responsible"
      value={editingData.company ? editingData.company.first_name_of_responsible || '' : ''}
      onChange={handleCompanyChange}
      className={`${styles.block_form} mr-2`}
      placeholder="Имя ответственного"
    />
    <Form.Control
      type="text"
      name="patronymic_of_responsible"
      value={editingData.company ? editingData.company.patronymic_of_responsible || '' : ''}
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
      value={editingData.company ? editingData.company.job_title_of_responsible || '' : ''}
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
      value={editingData.company ? editingData.company.additional_information || '' : ''}
      onChange={handleCompanyChange}
      className={styles.block_form}
      placeholder="Дополнительная информация"
    />
  </Col>
</Form.Group>

                          </>
                        )}
                        <Form.Group as={Row} controlId="fqw_by_application">
                          <Form.Label column sm={4}>ВКР по заявке</Form.Label>
                          <Col sm={8}>
                            <Form.Select
                              name="fqw_by_application"
                              value={editingData.fqw_by_application}
                              onChange={handleInputChange}
                              className={styles.block_form}
                            >
                              <option value="">Выберите...</option>
                              <option value="Предприятия">Предприятия</option>
                              <option value="Подразделения СФУ">Подразделения СФУ</option>
                              <option value="Предложена студентом">Предложена студентом</option>
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
                        <Row className="justify-content-center">
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
        </table>
      </div>
    </>
  );
};

export default EditThemesListSecretaryForm;

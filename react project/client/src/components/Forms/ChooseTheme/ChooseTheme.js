import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import styles from "./ChooseTheme.module.css";
import styles_base from "../../Forms/FormsBase.module.css";

const ChooseTheme = ({ themes_list, onThemeSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [url, setUrl] = useState('');
  const [haveOrganization, setHaveOrganization] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const location = window.location.pathname;
    const teacherName = decodeURIComponent(location.substring(location.lastIndexOf('/') + 1));
    setUrl(teacherName);
  }, []);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setSelectedTheme(null);
  };

  const handleThemeSelect = (themeId) => {
    const theme = themes_list.find(theme => theme.id === themeId);
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  const filteredDepartmentThemes = themes_list.filter(theme => theme.department === "СИИ");

  const urlParts = url.split(' ');
  const lastName = urlParts[0];
  const firstName = urlParts[1];
  const patronymic = urlParts[2];

  const filteredTeacherThemes = themes_list.filter(theme => {
    const teacher = theme.teacher;
    return teacher && teacher.last_name.toLowerCase() === lastName.toLowerCase() && theme.free === true;
  });

  return (
    <div>
      <div className={`${styles.button_group} my-4`}>
        <Button variant="none" className={styles.button1} onClick={() => handleSelectChange('select1')}>
          Предложить свою тему
        </Button>
        <Button variant="none" className={styles.button2} onClick={() => handleSelectChange('select2')}>
          Выбрать из перечня тем кафедры
        </Button>
        <Button variant="none" className={styles.button3} onClick={() => handleSelectChange('select3')}>
          Выбрать из тем, предложенных руководителем
        </Button>
      </div>
      <div className="select-group my-4">
        {selectedOption === 'select1' && (
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Своя тема ВКР
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" className={styles_base.form_control} placeholder="тема ВКР" />
              </Col>
            </Form.Group>
          </Form>
        )}
        {selectedOption === 'select2' && (
          <div>
            <Form.Group as={Row}>
              <Form.Label htmlFor="list_themes_department" column sm={4}>Перечень тем кафедры</Form.Label>
              <Col sm={8}>
                <Form.Control as="select" className={styles_base.form_control} id="list_themes_department" onChange={(e) => handleThemeSelect(parseInt(e.target.value))}>
                  <option value={0}>-</option>
                  {filteredDepartmentThemes.map(theme => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        )}
        {selectedOption === 'select3' && (
          <div>
            <Form.Group as={Row}>
              <Form.Label htmlFor="list_themes_teacher" column sm={4}>Перечень тем руководителя</Form.Label>
              <Col sm={8}>
                <Form.Control as="select" className={styles_base.form_control} id="list_themes_teacher" onChange={(e) => handleThemeSelect(parseInt(e.target.value))}>
                  <option value={0}>-</option>
                  {filteredTeacherThemes.map(theme => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        )}
      </div>
      {selectedTheme && (
        <div className='mb-3'>
          <h6>Выбранная тема:</h6>
          <Row className='justify-content-center'>
            <Col md={6}>Название организации</Col>
            <Col md={6}>{selectedTheme.company?.name || 'отсутствует'}</Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={6}>ФИО ответственного</Col>
            <Col md={6}>
              {selectedTheme.company?.last_name_of_responsible || 'отсутствует'} {selectedTheme.company?.first_name_of_responsible || ''} {selectedTheme.company?.patronymic_of_responsible || ''}
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={6}>Должность ответственного</Col>
            <Col md={6}>{selectedTheme.company?.job_title_of_responsible || 'отсутствует'}</Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={6}>ВКР по заявке</Col>
            <Col md={6}>{selectedTheme.fqw_by_application || 'отсутствует'}</Col>
          </Row>
        </div>
      )}
      {selectedOption === 'select1' && (
        <div>
          <Form.Group as={Row} controlId="organization_link">
            <Form.Label column sm={4}>Связь темы ВКР с организацией</Form.Label>
            <Col sm={8} className="d-flex align-items-center">
              <Form.Check
                type="radio"
                name="have_organization"
                value="no"
                label="Не связана"
                className="mr-2"
                checked={!haveOrganization}
                onChange={() => setHaveOrganization(false)}
              />
              <Form.Check
                type="radio"
                name="have_organization"
                value="yes"
                label="Связана"
                className="ml-2"
                checked={haveOrganization}
                onChange={() => setHaveOrganization(true)}
              />
            </Col>
          </Form.Group>
          {haveOrganization && (
            <div>
              <Form.Group as={Row} controlId="organization_name_field">
                <Form.Label column sm={4}>Наименование организации</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="Введите наименование организации" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio_responsible_field">
                <Form.Label column sm={4}>ФИО ответственного</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="ФИО ответственного" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="post_responsible_field">
                <Form.Label column sm={4}>Должность ответственного</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="Должность ответственного" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="additional_resposible">
                <Form.Label htmlFor="additional_info" column sm={4}>Дополнительно</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="Дополнительная информация" />
                </Col>
              </Form.Group>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChooseTheme;

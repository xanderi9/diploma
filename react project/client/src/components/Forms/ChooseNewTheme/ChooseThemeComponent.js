import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styles from "../ChooseTheme/ChooseTheme.module.css";
import styles_base from "../../Forms/FormsBase.module.css";

class ChooseThemeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedOption: '',
          haveOrganization: false,
          selectedTheme: null,
        };
      }
    
      handleSelectChange = (option) => {
        this.setState({ selectedOption: option, selectedTheme: null });
      };
    
      handleThemeSelect = (themeId) => {
        const theme = this.props.themes_list.find(theme => theme.id === themeId);
        this.setState({ selectedTheme: theme });
        this.props.onThemeSelect(theme);
      };
    
      render() {
        const { themes_list } = this.props;
        const { selectedOption, haveOrganization, selectedTheme } = this.state;
    
        const filteredDepartmentThemes = themes_list.filter(theme => theme.department);
        const filteredTeacherThemes = themes_list.filter(theme => theme.free === true);
    
        return (
          <div>
            <div className={`${styles.button_group} my-4`} >
              <Button variant="none" className={styles.button1} onClick={() => this.handleSelectChange('select1')}>
                Предложить свою тему
              </Button>
              <Button variant="none" className={styles.button2} onClick={() => this.handleSelectChange('select2')}>
                Выбрать из перечня тем кафедры
              </Button>
              <Button variant="none" className={styles.button3} onClick={() => this.handleSelectChange('select3')}>
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
                      <Form.Control type="text" className={styles_base.form_control} placeholder="Введите тему" />
                    </Col>
                  </Form.Group>
                </Form>
              )}
              {selectedOption === 'select2' && (
                <div>
                  <Form.Group as={Row} controlId="list_themes_department">
                    <Form.Label column sm="4">
                      Темы ВКР кафедры
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control as="select" className={styles_base.form_control} onChange={(e) => this.handleThemeSelect(parseInt(e.target.value))}>
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
                  <Form.Group as={Row} controlId="list_themes_teacher">
                    <Form.Label column sm="4">
                      Темы ВКР руководителя
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control as="select" className={styles_base.form_control} onChange={(e) => this.handleThemeSelect(parseInt(e.target.value))}>
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
                  <Col md={6}>{selectedTheme.company.name ? selectedTheme.company.name : 'отсутствует'}</Col>
                </Row>
                <Row className='justify-content-center'>
                  <Col md={6}>ФИО ответственного</Col>
                  <Col md={6}>{selectedTheme.company.last_name_of_responsible ? selectedTheme.company.last_name_of_responsible : 'отсутствует'}
                    {selectedTheme.company.first_name_of_responsible ? selectedTheme.company.first_name_of_responsible : ' '}
                    {selectedTheme.company.patronymic_of_responsible ? selectedTheme.company.patronymic_of_responsible : ' '}
                  </Col>
                </Row>
                <Row className='justify-content-center'>
                  <Col md={6}>Должность ответственного</Col>
                  <Col md={6}>{selectedTheme.company.job_title_of_responsible ? selectedTheme.company.job_title_of_responsible : 'отсутствует'}</Col>
                </Row>
                <Row className='justify-content-center'>
                  <Col md={6}>ВКР по заявке</Col>
                  <Col md={6}>{selectedTheme.fqw_by_application ? selectedTheme.fqw_by_application : 'отсутствует'}</Col>
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
                      onChange={() => this.setState({ haveOrganization: false })}
                    />
                    <Form.Check 
                      type="radio" 
                      name="have_organization" 
                      value="yes" 
                      label="Связана" 
                      className="ml-2" 
                      checked={haveOrganization}
                      onChange={() => this.setState({ haveOrganization: true })}
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
      }
    }
    export default ChooseThemeComponent
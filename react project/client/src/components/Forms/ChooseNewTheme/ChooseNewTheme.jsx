import React, { Component } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styles from "../RequestCard/RequestCard.module.css";
import styles_base from "../../Forms/FormsBase.module.css";
import ChooseThemeComponent from './ChooseThemeComponent';

export default class ChooseNewTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      haveOrganization: false,
      isRequestCreated: false,
      selectedTheme: null,
      type_vkr: '',
    };
  }

  componentDidMount() {
    // Проверка существования объекта
    this.checkRequestExistence();
  }

  checkRequestExistence = async () => {
    try {
      const response = await fetch('/api/requests');
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          this.setState({ isRequestCreated: true });
        }
      }
    } catch (error) {
      console.error('Ошибка при проверке существования заявки:', error);
    }
  };

  createRequest = async (event) => {
    event.preventDefault();
    const { selectedTheme, type_vkr } = this.state;
    const { studentData } = this.props;

    const requestData = {
      student: {
        user: {
          id: studentData.user.id,
        },
      },
      consultant: {
        user: {
          id: studentData.user.id,
        },
      },
      id_theme: selectedTheme.id,
      theme_str: selectedTheme.name,
      is_accepted_theme: false,
      is_accepted_request: false,
      type_of_fwq: type_vkr,
    };

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

     
    } catch (error) {
      console.error('Ошибка при создании заявки:', error);
      alert('Ошибка при создании заявки');
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  toggleOrganization = () => {
    this.setState(prevState => ({
      haveOrganization: !prevState.haveOrganization
    }));
  };

  handleThemeSelect = (selectedTheme) => {
    this.setState({ selectedTheme });
  };

  handleTypeChange = (event) => {
    this.setState({ type_vkr: event.target.value });
  };

  render() {
    const { themes_list, studentData } = this.props;
    const { isRequestCreated, showModal, selectedTheme, haveOrganization } = this.state;

    return (
      <>
        <Row className="justify-content-center">
          <Col md={10} className="px-4">
            <Row className='text-center mt-2'>
              <Col md={9}>
                <h4 className="mb-4 text-center">Подача заявки на смену темы ВКР</h4>
              </Col>
              <Col md={3}>
                <Button variant='none' className={styles.button1} onClick={this.toggleModal}>Правила</Button>
              </Col>
            </Row>

            <Modal show={showModal} onHide={this.toggleModal}>
              <Modal.Header closeButton>
                <Modal.Title>Правила заполнения формы</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ol>
                  <li>Нельзя отправить новую заявку, если уже есть текущая или подтвержденная заявка. Ее придется удалить.</li>
                  <li>Количество отправлений заявки ограничено. Нельзя отправить заявку более трех раз. Если вы столкнулись с превышением количества возможных отправлений - обратитесь в техническую поддержку.</li>
                  <li>При формировании заявки вы можете указать тему либо оставить ее пустой. После того как вашу заявку примет руководитель, вам нужно будет согласовать тему.</li>
                  <li>Если предлагаете тему, связанную с организацией, укажите название организации и данные ответственного.</li>
                  <li>Если потенциальный руководитель отклонил вашу заявку, попробуйте подать новую другому.</li>
                </ol>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.toggleModal}>Закрыть</Button>
              </Modal.Footer>
            </Modal>

            {isRequestCreated ? (
              <div>
                <p>Заявка уже создана</p>
                <Row className='justify-content-center my-3'>
                  <Col md={2}>
                    <Button variant='light' className={styles.button1} disabled>Удалить заявку</Button>
                  </Col>
                </Row>
              </div>
            ) : (
              <Form className="py-2 my-2" onSubmit={this.createRequest}>
                <ChooseThemeComponent themes_list={themes_list} onThemeSelect={this.handleThemeSelect} />

                <Form.Group as={Row} controlId="type_vkr">
                  <Form.Label column sm={4}>Вид ВКР</Form.Label>
                  <Col sm={8}>
                    <Form.Control as="select" className={styles_base.form_control} onChange={this.handleTypeChange}>
                      <option value="академическое">академическое</option>
                      <option value="проектно-исследовательское">проектно-исследовательское</option>
                      <option value="комплексное">комплексное</option>
                      <option value="в формате стартапа">в формате стартапа</option>
                      <option value="в формате стартапа с актом внедрения">в формате стартапа с актом внедрения</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="additional_info">
                  <Form.Label column sm={4}>Дополнительно:</Form.Label>
                  <Col sm={8}>
                    <Form.Control as="textarea" className={styles_base.form_control} rows={3} placeholder="Дополнительная информация" />
                  </Col>
                </Form.Group>

                <Row className='justify-content-center'>
                  <Col md={6}><Button type="submit" className={styles_base.button}>Отправить</Button></Col>
                </Row>
              </Form>
            )}
          </Col>
        </Row>
      </>
    );
  }
}

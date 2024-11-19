import React, { Component } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { Table, Col, Row, Button, Form } from 'react-bootstrap';
import styles from './ScheduleFQWModal.module.css';
import styles_base from '../BaseModal/BaseModal.module.css';
import generateTask from './GenerateTask';
import {Link} from 'react-router-dom'

export default class ScheduleFQWModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editedStages: this.props.data.work_schedule.map(stage => ({
        ...stage,
        completion_mark: stage.completion_mark || '',
        absence: stage.absence || ''
      }))
    };
  }

  handleClick = async () => {
    await generateTask({
      data:  this.props.data.user[0],
      request_data_task: this.props.data.request_without_student[0],
      schedule_stud_prof: this.state.editedStages,
      teacher_ei: this.props.data.teacher_employee_information[0]
    });
  };

  handleInputChange = (index, field, value) => {
    const updatedStages = [...this.state.editedStages];
    updatedStages[index][field] = value === 'true';
    this.setState({ updatedStages });
  };

  render() {
    const { show, handleClose, darkMode, data } = this.props;
    const { editedStages } = this.state;

    const content = (
      <div className='p-2'>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Этап</th>
              <th>Срок выполнения этапа</th>
              <th>Результат</th>
              <th>Отметка о выполнении этапа</th>
              <th>Неявка</th>
            </tr>
          </thead>
          <tbody>
            {editedStages.map((stage, index) => (
              <tr key={stage.id}>
                <td>{stage.stage_name}</td>
                <td>{stage.start} - {stage.end}</td>
                <td>{stage.result} </td>
                <td>
                  {data.user.type_of_user === 'Руководитель' ? (
                    <Form.Control
                      as="select"
                      value={stage.completion_mark} 
                      onChange={(e) => this.handleInputChange(index, 'completion_mark', e.target.value)}
                    >
                      <option value='true'>Выполнено</option>
                      <option value='false'>Не выполнено</option>
                    </Form.Control>
                  ) : (
                   stage.completion_mark.toString() === 'true' ? 'Выполнено' : 'Не выполнено'
                  )}
                </td>
                <td>
                  {data.user.type_of_user === 'Руководитель' ? (
                    <Form.Control
                      as="select"
                      value={stage.absence}
                      onChange={(e) => this.handleInputChange(index, 'absence', e.target.value)}
                    >
                      <option value='true'>Да</option>
                      <option value='false'>Нет</option>
                    </Form.Control>
                  ) : (
                    stage.absence.toString()
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );

    const footer = (
      <Row className="justify-content-between px-3">
        <Col md={5}>
          <Button variant='none' className={styles_base.button_cancel} onClick={this.handleClick}>Экспортировать</Button>
        </Col>
        <Col md={5}>
        {data.user.type_of_user === 'Руководитель' ? (
          <Link to='/create_schedule_work_fqw'>
          <Button variant='none' className={styles_base.button_next} onClick={handleClose}>Редактировать</Button>
          </Link>
        ) : 
          <Button variant='none' className={styles_base.button_next} onClick={handleClose}>Ок</Button>
        }
        </Col>
      </Row>
    );

    return (
      <BaseModal
        show={show}
        handleClose={handleClose}
        title={'График работы над ВКР'}
        content={content}
        darkMode={darkMode}
        sourceData={this.state.editedStages}
        modalClass={styles.container_modal}
        footer={footer}
        request_data_task={this.props.request_data_task}
      />
    );
  }
}

import React, { useState } from 'react';
import { Table, Col, Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import generateTask from './GenerateTask';
import styles from '../ScheduleFQWModal/ScheduleFQWModal.module.css';
import styles_base from '../BaseModal/BaseModal.module.css';
import BaseModal from '../BaseModal/BaseModal';

function ScheduleTeacher({ show, handleClose, darkMode, schedule_stud_prof, data, request }) {
    console.log('заявка', request)
    const type_of_user = localStorage.getItem('type_of_user');
    const [editedStages, setEditedStages] = useState(schedule_stud_prof.map(stage => ({
        ...stage,
        completion_mark: stage.completion_mark || '',
        absence: stage.absence || ''
    })));

    const handleClick = async () => {
        await generateTask({

            data: data,
            schedule_stud_prof: editedStages,
            request_data_task: request
        });
    };

    const handleInputChange = (index, field, value) => {
        const updatedStages = [...editedStages];
        updatedStages[index][field] = value === 'true';
        setEditedStages(updatedStages);
    };

    const content = (
        <div className={styles.container_modal}>
            <div className='p-2'>
                <Table bordered hover responsive>
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
                                <td>{stage.result}</td>
                                <td>
                                    {type_of_user === 'Руководитель' ? (
                                        <Form.Control
                                            as="select"
                                            value={stage.completion_mark}
                                            onChange={(e) => handleInputChange(index, 'completion_mark', e.target.value)}
                                        >
                                            <option value='true'>Выполнено</option>
                                            <option value='false'>Не выполнено</option>
                                        </Form.Control>
                                    ) : (
                                        stage.completion_mark.toString()
                                    )}
                                </td>
                                <td>
                                    {type_of_user === 'Руководитель' ? (
                                        <Form.Control
                                            as="select"
                                            value={stage.absence}
                                            onChange={(e) => handleInputChange(index, 'absence', e.target.value)}
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
            <Row className="justify-content-between px-3">
                <Col md={5}>
                    <Button variant='none' className={styles_base.button_cancel} onClick={handleClick}>Экспортировать</Button>
                </Col>
                <Col md={5}>
                    {type_of_user === 'Руководитель' ? (
                        <Link to='/create_schedule_work_fqw'>
                            <Button variant='none' className={styles_base.button_next} onClick={handleClose}>Редактировать</Button>
                        </Link>
                    ) : (
                        <Button variant='none' className={styles_base.button_next} onClick={handleClose}>Ок</Button>
                    )}
                </Col>
            </Row>
        </div>
    );

    return (
        <BaseModal
            show={show}
            handleClose={handleClose}
            title={'График работы над ВКР'}
            content={content}
            darkMode={darkMode}
            modalClass={styles.container_modal}
        />
    );
}

export default ScheduleTeacher;

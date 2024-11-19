import React, { useState, useEffect } from 'react';
import { Container, Form, Table, Button, Row, Col } from 'react-bootstrap';
import BlockInfo from '../../BlockInfo/BlockInfo';
import styles from './CreateScheduleWorkFQWForm.module.css';
import plus from '../../../img/plus.png';
import decline from '../../../img/decline.png';

function CreateScheduleWorkFQWForm({ schedule_stud_prof }) {
    const [scheduleRows, setScheduleRows] = useState(
        schedule_stud_prof && schedule_stud_prof.length > 0
          ? schedule_stud_prof
          : [{ stage_name: '', start: '', deadline: '', result: '' }]
      );

    const addRow = () => {
        setScheduleRows([...scheduleRows, { stage_name: '', start: '', deadline: '', result: '' }]);
    };
   
    const deleteRow = (index) => {
        const newRows = [...scheduleRows];
        newRows.splice(index, 1);
        setScheduleRows(newRows);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newRows = [...scheduleRows];
        newRows[index][name] = value;
        setScheduleRows(newRows);
    };

    const populateWithHiddenData = () => {
        const hiddenTable = document.getElementById('hiddenTable');
        const newRows = [];
        for (let i = 1; i < hiddenTable.rows.length; i++) {
            const cells = hiddenTable.rows[i].cells;
            newRows.push({
                stage_name: cells[0].innerHTML,
                start: cells[1].innerHTML,
                deadline: cells[2].innerHTML,
                result: cells[3].innerHTML
            });
        }
        setScheduleRows(newRows);
    };

    return (
        <>
            <h4 className="mb-4 text-center">Создать график работы над ВКР</h4>
            <BlockInfo>
                Вы можете создать график самостоятельно или воспользоваться готовым решением. Добавляйте и удаляйте строки с помощью нажатия соответствующих кнопок.
                <Row>
                    <Button onClick={populateWithHiddenData} variant="none" className="fw-bold">Воспользоваться готовым решением</Button>
                </Row>
            </BlockInfo>
            <Form>
                <Table className={styles.graf_table}>
                    <thead>
                        <tr>
                            <th>Наименование этапа</th>
                            <th>Начало выполнения этапа</th>
                            <th>Конец выполнения этапа</th>
                            <th>Результат выполнения этапов</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {scheduleRows.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <textarea
                                        type="text"
                                        name="stage"
                                        value={row.stage_name}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={styles.form_control}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name="start"
                                        value={row.start}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={styles.form_control}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={row.deadline}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={styles.form_control}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        type="text"
                                        name="result"
                                        value={row.result}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className={styles.form_control}
                                    />
                                </td>
                                <td>
                                    {index === 0 ? (
                                        <Button variant="none" onClick={addRow}>
                                            <img src={plus} alt="Добавить строку" width="30" height="30" />
                                        </Button>
                                    ) : (
                                        <Button variant="none" onClick={() => deleteRow(index)}>
                                            <img src={decline} alt="Удалить" width="30" height="30" />
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className="justify-content-center">
            <Col md={4}>
                <Button variant="outline-secondary" className={styles.button_cancel}>Отмена</Button>
            </Col>
            <Col md={4}>
                <Button variant="primary" type="submit" className={styles.button_form}>Сохранить</Button>
            </Col>
        </Row>
            </Form>
            <table id="hiddenTable" style={{ display: 'none' }}>
                <thead>
                    <tr>
                        <th>Наименование этапа</th>
                        <th>Начало выполнения этапа</th>
                        <th>Конец выполнения этапа</th>
                        <th>Результат выполнения этапов</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ознакомление с целью и задачами работы</td>
                        <td>04.02.2024</td>
                        <td>10.02.2024</td>
                        <td>Краткое эссе по теме ВКР</td>
                    </tr>
                    <tr>
                        <td>Сбор литературных источников</td>
                        <td>11.02.2024</td>
                        <td>17.02.2024</td>
                        <td>Список использованных источников</td>
                    </tr>
                    <tr>
                        <td>Анализ собранных источников литературы</td>
                        <td>18.02.2024</td>
                        <td>24.02.2024</td>
                        <td>Реферат о проблемно предметной области</td>
                    </tr>
                    <tr>
                        <td>Уточнение и обоснование актуальности цели и задач ВКР</td>
                        <td>25.02.2024</td>
                        <td>28.02.2024</td>
                        <td>Окончательная формулировка цели и задач ВКР</td>
                    </tr>
                    <tr>
                        <td>Решение первой задачи ВКР</td>
                        <td>18.03.2024</td>
                        <td>31.03.2024</td>
                        <td>Доклад и презентация по решению первой задачи</td>
                    </tr>
                    <tr>
                        <td>Решение второй задачи ВКР</td>
                        <td>01.04.2024</td>
                        <td>14.04.2024</td>
                        <td>Доклад и презентация по решению второй задачи</td>
                    </tr>
                    <tr>
                        <td>Решение третьей задачи ВКР</td>
                        <td>15.04.2024</td>
                        <td>30.04.2024</td>
                        <td>Доклад и презентация по третьей задаче ВКР</td>
                    </tr>
                    <tr>
                        <td>Подготовка доклада и презентации по теме ВКР</td>
                        <td>01.05.2024</td>
                        <td>05.05.2024</td>
                        <td>Доклад с презентацией по теме ВКР</td>
                    </tr>
                    <tr>
                        <td>Компоновка отчета по результатам решения задач ВКР</td>
                        <td>06.05.2024</td>
                        <td>09.05.2024</td>
                        <td>Отчет по результатам решения задач ВКР</td>
                    </tr>
                    <tr>
                        <td>Первичный нормоконтроль (Н/К)</td>
                        <td>-</td>
                        <td>25.05.2024</td>
                        <td>Отчет по результатам решения задач ВКР</td>
                    </tr>
                    <tr>
                        <td>Предварительная защита результатов ВКР</td>
                        <td>-</td>
                        <td>31.05.2024</td>
                        <td>Доклад с презентацией по теме ВКР</td>
                    </tr>
                    <tr>
                        <td>Вторичный нормоконтроль (Н/К)</td>
                        <td>-</td>
                        <td>10.06.2024</td>
                        <td>Пояснительная записка, презентация ВКР</td>
                    </tr>
                    <tr>
                        <td>Итоговый нормоконтроль (Н/К)</td>
                        <td>-</td>
                        <td>24.06.2024</td>
                        <td>Пояснительная записка, презентация ВКР</td>
                    </tr>
                    <tr>
                        <td>Защита ВКР</td>
                        <td>-</td>
                        <td>28.06.2024</td>
                        <td>Пояснительная записка, доклад и презентация по результатам бакалаврской работы</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default CreateScheduleWorkFQWForm;

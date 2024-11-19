import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, PageOrientation, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import styles_base from '../FormsBase.module.css'

const CreateScheduleProtectionForm = ({ groups_for_schedule, students_list_for_schedule }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [audienceNumber, setAudienceNumber] = useState('');

    useEffect(() => {
    }, [groups_for_schedule]);

    const toggleAll = (event) => {
        const checkboxes = document.querySelectorAll('.nested-list input[type="checkbox"]');
        const isSelected = event.target.classList.contains('selected');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = !isSelected;
        });
        event.target.classList.toggle('selected');
        updateSelectedItems();
    };

    const toggleSubList = (listId, event) => {
        const list = document.getElementById(listId);
        const toggleBtn = event.target;
        if (list.style.display === 'none') {
            list.style.display = 'block';
            toggleBtn.textContent = toggleBtn.textContent.replace('[+]', '[-]');
        } else {
            list.style.display = 'none';
            toggleBtn.textContent = toggleBtn.textContent.replace('[-]', '[+]');
        }
    };

    const updateSelectedItems = () => {
        const checkboxes = document.querySelectorAll('.nested-list input[type="checkbox"]:checked');
        const selected = [];
        checkboxes.forEach((checkbox) => {
            const label = checkbox.nextElementSibling.textContent;
            const groupName = label.split(' (')[0]; // Extract only the group name without the student count
            selected.push(groupName);
        });
        setSelectedItems(selected);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        generateDocument();
    };

    if (!groups_for_schedule) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    const addWeekdays = (date, days) => {
        const newDate = new Date(date);
        let addedDays = 0;
    
        while (addedDays < days) {
            newDate.setDate(newDate.getDate() + 1);
    
            // Пропускаем выходные дни (суббота и воскресенье)
            if (newDate.getDay() !== 0 && newDate.getDay() !== 6) {
                addedDays++;
            }
        }
    
        return newDate;
    };
    
    
    
    

    const getStudentCount = (groupId) => {
        return students_list_for_schedule.filter(student => student.group === groupId).length;
    };

    // Сортировка бакалавров по названию группы
    const bachelors = groups_for_schedule
        .filter(group => group.name.includes('б'))
        .sort((a, b) => a.name.localeCompare(b.name));

    // Сортировка магистров по названию группы
    const masters = groups_for_schedule
        .filter(group => group.name.includes('м'))
        .sort((a, b) => a.name.localeCompare(b.name));

    const createTableRow = (number, date, time, audience, group) => {
        return new TableRow({
            children: [
                createTableCell(number, true),
                createTableCell(date, true),
                createTableCell(time, true),
                createTableCell(audience, true),
                createTableCell(group, true),
            ],
        });
    };

    const createTableCell = (text, isBold = false) => {
        return new TableCell({
            children: [
                new Paragraph({
                    text: text,
                    run: {
                        bold: isBold,
                    },
                }),
            ],
            margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
            },
        });
    };

    const generateDocument = () => {
        const startDate = new Date(dateStart); // Используем введённую пользователем дату как начальную
    
        const doc = new Document({
            creator: "YourAppName",
            title: "Schedule Protection",
            description: "Document with the schedule protection details",
            sections: [],
            styles: {
                paragraphStyles: [
                    {
                        id: "default",
                        name: "Default",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            font: "Times New Roman",
                            size: '12pt',
                            color: '000000'
                        },
                    },
                ],
            },
        });
    
        const documentTitle = new Paragraph({
            text: "Расписание защит кафедры СИИ ИКИТ СФУ",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
                before: 240,
                after: 240,
            },
            style: 'default'
        });
    
        const sectionProperties = {
            width: 15840,
            height: 10000,
            margins: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
            },
        };
    
        const combinedElements = [];
        combinedElements.push(documentTitle);
    
        let currentDate = startDate; // Начинаем с введённой даты без добавления дней
        let groupsToCombine = [];
        let totalStudentCount = 0;
    
        selectedItems.forEach((groupName, index) => {
            const group = groups_for_schedule.find(group => group.name === groupName);
    
            if (!group || !group.specialty || !group.specialty.field_of_study) {
                console.warn(`Skipping group due to missing data: ${groupName}`);
                return;
            }
    
            let text;
            if (groupName.includes('б')) {
                text = `Бакалавры по специальности ${group.specialty.code} "${group.specialty.name}" по специализированной магистерской программе ${group.specialty.field_of_study.code} "${group.specialty.field_of_study.name}"`;
            } else if (groupName.includes('м')) {
                text = `Магистры по специальности ${group.specialty.code} "${group.specialty.name}" по специализированной магистерской программе ${group.specialty.field_of_study.code} "${group.specialty.field_of_study.name}"`;
            } else {
                text = `Группа ${groupName}`;
            }
    
            const paragraphBeforeTable = new Paragraph({
                text: text,
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.LEFT,
                spacing: {
                    before: 240,
                    after: 240,
                },
                style: 'default'
            });
    
            combinedElements.push(paragraphBeforeTable);
    
            groupsToCombine.push(group);
            totalStudentCount += getStudentCount(group.id);
    
            const isLastGroup = index === selectedItems.length - 1;
            const nextGroup = selectedItems[index + 1] ? groups_for_schedule.find(group => group.name === selectedItems[index + 1]) : null;
    
            if (isLastGroup || (nextGroup && totalStudentCount + getStudentCount(nextGroup.id) > 12)) {
                const tableRows = [];
                let rowCounter = 1;
                const rowsCount = Math.ceil(totalStudentCount / 12);
                for (let i = 0; i < rowsCount; i++) {
                    const formattedDate = formatDate(currentDate);
                    tableRows.push(createTableRow(rowCounter++, formattedDate, '9:00', audienceNumber, groupsToCombine.map(group => group.name).join(", ")));
                    currentDate = addWeekdays(currentDate, 1);
                }
    
                const table = new Table({
                    width: {
                        size: 100,
                        type: WidthType.PERCENTAGE,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                createTableCell("№", true),
                                createTableCell("Дата", true),
                                createTableCell("Время", true),
                                createTableCell("Аудитория", true),                            
                                createTableCell("Уч. группа", true),
                            ],
                        }),
                        ...tableRows,
                    ],
                });
    
                combinedElements.push(table);
    
                totalStudentCount = 0;
                groupsToCombine = [];
                combinedElements.push(new Paragraph({
                    text: "",
                    spacing: {
                        before: 30,
                        after: 30,
                    },
                }));
            }
        });
    
        // Add reserve day table
       // Добавление дней для получения резервного дня
const reserveDayDate = addWeekdays(currentDate, 1); // totalDays + 1, чтобы учесть весь период плюс один день

// Форматирование даты резервного дня
const reserveDayFormattedDate = formatDate(reserveDayDate);

// Создание таблицы для резервного дня
const reserveDayTable = new Table({
    width: {
        size: 100,
        type: WidthType.PERCENTAGE,
    },
    rows: [
        new TableRow({
            children: [
                createTableCell("№", true),
                createTableCell("Дата", true),
                createTableCell("Время", true),
                createTableCell("Аудитория", true),
                createTableCell("Уч. группа", true),
            ],
        }),
        createTableRow(1, reserveDayFormattedDate, '9:00', audienceNumber, 'Резервный день для участников комиссионной пересдачи (для всех групп) - на торжественное вручение дипломов не попадают'),
    ],
});

    
        combinedElements.push(reserveDayTable);
    
        const section = {
            properties: sectionProperties,
            children: combinedElements,
        };
    
        doc.addSection(section);
    
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "schedule.docx");
        });
    };
    

    return (
        <Row className="justify-content-center">
            <Col md={7}>
                <h4 className="mb-4 text-center">Создание графика защит ВКР</h4>
                <Form className="px-4 py-2 m-2" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Выберите нужных выпускников из списка:</Form.Label>
                        <ul>
                            <li className="top-level-item" onClick={toggleAll}>
                                Все <span className="toggle-btn">[+]</span>
                            </li>
                            <ul className="nested-list" id="all">
                                <li className="top-level-item" onClick={(e) => toggleSubList('bakalavry', e)}>
                                    Бакалавры <span className="toggle-btn">[+]</span>
                                </li>
                                <ul className="nested-list" id="bakalavry">
                                    {bachelors.map(group => (
                                        <li key={group.id}>
                                            <Form.Check
                                                type="checkbox"
                                                id={group.id}
                                                label={`${group.name} (${getStudentCount(group.id)})`}
                                                onClick={updateSelectedItems}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <li className="top-level-item" onClick={(e) => toggleSubList('magistranty', e)}>
                                    Магистры <span className="toggle-btn">[+]</span>
                                </li>
                                <ul className="nested-list" id="magistranty">
                                    {masters.map(group => (
                                        <li key={group.id}>
                                            <Form.Check
                                                type="checkbox"
                                                id={group.id}
                                                label={`${group.name} (${getStudentCount(group.id)})`}
                                                onClick={updateSelectedItems}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </ul>
                        </ul>
                        <div id="selected-items">
                            Выбранные элементы: {selectedItems.join(', ')}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите дату начала защиты ВКР:</Form.Label>
                        <Form.Control type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите аудиторию:</Form.Label>
                        <Form.Control type="text" value={audienceNumber} onChange={(e) => setAudienceNumber(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant='light' className={styles_base.button}>
                        Рассчитать
                    </Button>
                </Form>
            </Col>
            <hr className={styles_base.vertical_line}/>
            <Col md={4} className="mt-5">
                <ol>
                    <li>Выберите нужную группу либо всех выпускников сразу</li>
                    <li>Далее введите планируемые даты начала и завершения защиты ВКР</li>
                    <li>Следующим шагом введите длительность временного интервала, рассчитанного на одно выступление выпускника.</li>
                    <li>Нажмите “Рассчитать”.</li>
                    <li>
                        Далее вы сможете сохранить полученный список как черновик, опубликовать (тогда его увидят все пользователи системы) или экспортировать в формат word
                    </li>
                </ol>
            </Col>
        </Row>
    );
};

export default CreateScheduleProtectionForm;


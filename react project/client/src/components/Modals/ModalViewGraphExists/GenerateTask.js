import React, { useState } from 'react';
import petrovich from 'petrovich';
import RussianNouns from 'russian-nouns-js';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import word from './3.docx';

const Modal = ({ message, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <p>{message}</p>
    </div>
  </div>
);

const generateTask = async ({ data, request_data_task, schedule_stud_prof }) => {


  if (!request_data_task.student.first_name || !request_data_task.student.last_name || !request_data_task.student.patronymic) {
    return { error: 'ФИО неполное. Все поля ФИО должны быть заполнены.' };
  }

  if (schedule_stud_prof.length === 0) {
    return { error: 'График отсутствует. График должен быть заполнен.' };
  }

  console.log(request_data_task.student.first_name, request_data_task.student.patronymic, request_data_task.student.last_name);
  console.log(request_data_task);


  const person = {
    first: request_data_task.student.first_name,
    middle: request_data_task.student.patronymic,
    last: request_data_task.student.last_name,
  };
  const fio = petrovich(person, 'dative');
  const rne = new RussianNouns.Engine();

  function getInitials(firstName, patronymic) {
    return `${firstName.charAt(0)}.${patronymic.charAt(0)}.`;
  }

  const np_s = getInitials(request_data_task.student.first_name, request_data_task.student.patronymic);
  const np_t = getInitials(request_data_task.teacher.first_name, request_data_task.teacher.patronymic);
  const year = new Date().getFullYear();
  const declineWord = (word, gender) => rne.decline({ text: word.split(' ')[0], gender }, 'родительный');


  const student = data.student_list.find(student => student.user_id === request_data_task.student.id);
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
};

  try {
    const response = await fetch(word);
    if (!response.ok) throw new Error('Ошибка сети');
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);

    const dataToRender = {
      year: year,
      dat_student_last_name: fio.last,
      student_last_name: request_data_task.student.last_name,
      student_first_name: fio.first,
      student_patronymic: fio.middle,
      group_name: student.group ? student.group.name : '',
      speciality_code:  student.group ? student.group.specialty.code : '',
      speciality_name:  student.group ? student.group.specialty.name : '',
      profile_code:  student.group ?  student.group.specialty.field_of_study.code : '',
      profile_name: student.group ? student.group.specialty.field_of_study.name : '',
      theme_name: request_data_task.theme.name,
      np_s: np_s,
      np_t: np_t,
      teacher_last_name: request_data_task.teacher.last_name,
      job_title:  '',
      place_of_work:  '',
      schedule_stud_prof: schedule_stud_prof.map(stage => ({
        stage_name: stage.stage_name,
        start: formatDate(stage.start), // Форматирование начальной даты
        end: stage.end ? '-' + formatDate(stage.end) : '',
        result: stage.result,
        completion_mark: stage.completion_mark ? 'Выполнено' : 'не выполнено',
      })),
    };

    doc.setData(dataToRender);
    doc.render();

    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, `Задание на ВКР ${request_data_task.student.last_name}.docx`);
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
  }
};

const TaskGenerator = ({ data, request_data_task, schedule_stud_prof, teacher_ei }) => {
  const [modalMessage, setModalMessage] = useState('');

  const handleGenerateTask = async () => {
    const result = await generateTask({ data, request_data_task, schedule_stud_prof, teacher_ei });
    if (result?.error) {
      setModalMessage(result.error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateTask}>Generate Task</button>
      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage('')} />}
    </div>
  );
};

export default generateTask;

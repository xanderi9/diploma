import petrovich from 'petrovich';
import RussianNouns from 'russian-nouns-js';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import word from './1.docx';

const generateDocument = async ({ generating_info, action, formState }) => {
  console.log(formState);
  if (action === 'approve') action = 'утвердить';
  if (action === 'change') action = 'изменить';

  let type_of_program, type_of_speciality;
  if (generating_info.student[0].level_of_education === 'бакалавриат' ||generating_info.student[0].group.course_number===4 ) {
    type_of_program = 'профилю / специализации';
    type_of_speciality = 'подготовки / специальности';
  } else if (generating_info.student[0].level_of_education === 'магистратура' || generating_info.student[0].group.course_number===6) {
    type_of_program = 'магистерской программе';
    type_of_speciality = 'подготовки';
  }

  const teach = generating_info.request_without_student[0].teacher || {};
  const consul = generating_info.request_without_student[0].consultant || {};
  const ei_teacher = generating_info.teacher_employee_information[0] || {};
  const ei_consultant = generating_info.consultant_employee_information[0] || {};

  const fullname = `${generating_info.student[0].user.last_name} ${generating_info.student[0].user.first_name} ${generating_info.student[0].user.patronymic || ''}`;
  const np_s = `${generating_info.student[0].user.first_name.charAt(0)}.${generating_info.student[0].user.patronymic ? generating_info.student[0].user.patronymic.charAt(0) : ''}. `;
  const np_t = `${teach.first_name ? teach.first_name.charAt(0) : ''}.${teach.patronymic ? teach.patronymic.charAt(0) : ''}. `;

  const surname_gen = petrovich.female.last.genitive(generating_info.student[0].user.last_name);
  const teacher = {
    last: teach.last_name || '',
    first: teach.first_name || '',
    middle: teach.patronymic || '',
  };
  const consultant = consul.patronymic ? {
    last: consul.last_name || '',
    first: consul.first_name || '',
    middle: consul.patronymic || '',
  } : {};

  let fullnameTeac = petrovich(teacher, 'accusative');
  fullnameTeac = `${fullnameTeac.last} ${fullnameTeac.first} ${fullnameTeac.middle}`;
  let fio_consultant = consul.patronymic ? petrovich(consultant, 'accusative') : '';
  fio_consultant = fio_consultant && consul.patronymic ? `${fio_consultant.last} ${fio_consultant.first} ${fio_consultant.middle}` : '';

  const rne = new RussianNouns.Engine();
  const declineWord = (word, gender) => rne.decline({ text: word.split(' ')[0], gender }, 'родительный');

  const form_of_studying = formState.formOfEducation ? formState.formOfEducation.replace(formState.formOfEducation.split(' ')[0], declineWord(formState.formOfEducation, 'женский')) : '';
  const academic_title = formState.teacherAcademicTitle ? formState.teacherAcademicTitle.replace(formState.teacherAcademicTitle.split(' ')[0], declineWord(formState.teacherAcademicTitle, 'средний')) : '';
  const academic_degree = formState.teacherAcademicDegree ? formState.teacherAcademicDegree.replace(formState.teacherAcademicDegree.split(' ')[0], declineWord(formState.teacherAcademicDegree, 'средний')) : '';
  const job_title = formState.teacherJobTitle ? formState.teacherJobTitle.replace(formState.teacherJobTitle.split(' ')[0], declineWord(formState.teacherJobTitle, 'средний')) : '';
  const place_of_work = formState.teacherPlaceOfWork ? formState.teacherPlaceOfWork.replace(formState.teacherPlaceOfWork.split(' ')[0], declineWord(formState.teacherPlaceOfWork, 'женский')) : '';

  const cons_academic_title = formState.consultantAcademicTitle ? formState.consultantAcademicTitle.replace(formState.consultantAcademicTitle.split(' ')[0], declineWord(formState.consultantAcademicTitle, 'средний')) : '';
  const cons_academic_degree = formState.consultantAcademicDegree ?  formState.consultantAcademicDegree.replace( formState.consultantAcademicDegree.split(' ')[0], declineWord( formState.consultantAcademicDegree, 'средний')) : '';
  const cons_job_title = formState.consultantJobTitle ? formState.consultantJobTitle.replace(formState.consultantJobTitle.split(' ')[0], declineWord(formState.consultantJobTitle, 'средний')) : '';
  const cons_place_of_work = formState.consultantPlaceOfWork ? formState.consultantPlaceOfWork.replace(formState.consultantPlaceOfWork.split(' ')[0], declineWord(formState.consultantPlaceOfWork, 'женский')) : '';

  try {
    const response = await fetch(word);
    if (!response.ok) throw new Error('Ошибка сети');
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);

    const dataToRender = {
      action,
      type_of_program,
      type_of_speciality,
      np_s,
      np_t,
      surname: generating_info.student[0].user.last_name,
      surname_gen,
      phoneNumber: formState.phone,
      email: formState.email,
      kurs: formState.course,
      group: formState.group,
      specialtyCode: generating_info.student[0].group.specialty.code,
      specialtyName: generating_info.student[0].group.specialty.name,
      fieldOfStudyCode: generating_info.student[0].group.specialty.field_of_study.code,
      fieldOfStudyName: generating_info.student[0].group.specialty.field_of_study.name,
      form_of_studying,
      base_of_studying: formState.basisOfStudy,
      fullname,
      theme_str: generating_info.request_without_student[0].theme.name,
      fullnameTeacher: fullnameTeac,
      surnameTeacher: teach.last_name,
      academic_degree,
      academic_title,
      job_title,
      place_of_work,
      fio_consultant,
      cons_academic_degree,
      cons_academic_title,
      cons_job_title,
      cons_place_of_work,
      ...formState,
    };

    doc.setData(dataToRender);
    try {
      doc.render();
    } catch (error) {
      console.error('Ошибка рендеринга документа:', error);
      return;
    }

    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, 'Заявление.docx');
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
  }
};

export default generateDocument;

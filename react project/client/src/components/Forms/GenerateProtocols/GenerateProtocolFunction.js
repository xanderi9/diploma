import petrovich from 'petrovich';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import word from './protocol.docx';
import RussianNouns from 'russian-nouns-js';

const generateProtocolsFunction = async ({ 
    composition_of_sec, 
    selectedGroup,
    groupData,

    requests,
    group_list, 
    ei
}) => {
    console.log(requests)
    console.log(groupData)
    console.log(selectedGroup)
    console.log('еи итог', ei)

    const chairman = composition_of_sec.member_of_SEC.find(comp => comp.chairman_of_SEC === true);
    const chairman_ei = composition_of_sec.employee_information.find(comp => comp.user_id === chairman.member_of_SEC.id);
    const members_list = composition_of_sec.member_of_SEC.filter(sec => sec.chairman_of_SEC === false).map(member => {
        const member_ei = composition_of_sec.employee_information.find(comp => comp.user_id === member.member_of_SEC.id);
        console.log('гэки эи', member_ei);
        return {
            ...member,
            employee_information: member_ei
        };
    });
    
    const group = group_list.find(gr => gr.name === selectedGroup);
    const rne = new RussianNouns.Engine();
  const declineWord = (word, gender) => rne.decline({ text: word.split(' ')[0], gender }, 'родительный');
    // Функция для получения инициалов (Фамилия И.О.)
    const getInitials = (firstName, patronymic) => {
        return `${firstName.charAt(0)}. ${patronymic.charAt(0)}.`;
    };

    // Функция для форматирования даты
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    };

    try {
        // Загружаем шаблон документа
        const response = await fetch(word); // Путь к вашему файлу шаблона
        if (!response.ok) throw new Error('Ошибка сети');
        const arrayBuffer = await response.arrayBuffer();

        // Создаем инстанцию JSZip
        const zip = new JSZip();

        // Проходимся по каждому элементу groupData (предполагаем, что это массив)
        for (const item of groupData) {
            const student = item.user;

            const full_name_student = {
                last: student.last_name,
                first: student.first_name,
                middle: student.patronymic,
              };
              let fullnameStudent = petrovich(full_name_student, 'accusative');
              let fullnameStudentGen = petrovich(full_name_student, 'genitive');
              let fullnameStudentDat = petrovich(full_name_student, 'dative');
              fullnameStudent = `${fullnameStudent.last} ${fullnameStudent.first} ${fullnameStudent.middle}`;
              fullnameStudentGen =`${fullnameStudentGen.last} ${fullnameStudentGen.first} ${fullnameStudentGen.middle}`;
              fullnameStudentDat =`${fullnameStudentDat.last} ${fullnameStudentDat.first} ${fullnameStudentDat.middle}`;

            const request = requests.request_list.find(req => req.student.username === student.username);
            console.log(request);
            if (!request) {
                console.warn(`Для студента ${student.last_name} ${student.first_name} не найдена принятая заявка.`);
                continue; // Пропускаем студента без принятой заявки
            }

            const personalProtection = requests.personal_work_protection_list.find(pp => pp.request === request.id);
            console.log('защита персона', personalProtection);
            if (!personalProtection) {
                console.warn(`Для студента ${student.last_name} ${student.first_name} не найдена персональная защита.`);
                continue; // Пропускаем студента без персональной защиты
            }

            const generalProtection = requests.general_work_protection_list.find(gp => gp.id === personalProtection.work_protection);

            if (!generalProtection) {
                console.warn(`Для студента ${student.last_name} ${student.first_name} не найдена общая защита.`);
                continue; // Пропускаем студента без общей защиты
            }

            const teacher = request.teacher;
            console.log('тичер', teacher);
            const teacher_ei = ei.find(e => e.user_id === teacher.id);
           
            console.log(teacher);
            const theme = request.theme;

            // Вычисляем время начала и окончания защиты
            const [hours_start, min_start] = personalProtection.personal_time.split(':');
            const startTime = new Date();
            startTime.setHours(hours_start);
            startTime.setMinutes(min_start);
            startTime.setMinutes(startTime.getMinutes() + 20);

            const hours_end = startTime.getHours();
            const min_end = startTime.getMinutes();

            // Формируем объект с данными для подстановки в шаблон
            const dataToRender = {
                protocol_number: personalProtection.protocol_number,
                group_protection_date: new Date(generalProtection.date).toLocaleDateString('ru-RU'),
                hours_start: hours_start,
                min_start: min_start,
                hours_end: hours_end,
                min_end: min_end,
                chairman_last_name: chairman.member_of_SEC.last_name,
                chairman_np: getInitials(chairman.member_of_SEC.first_name, chairman.member_of_SEC.patronymic),
                chairman_degree: chairman_ei.academic_degree,
                chairman_job_title: chairman_ei.job_title,
                members_list: members_list.map(member => ({
                    members_last_name: member.member_of_SEC.last_name,
                    members_np: getInitials(member.member_of_SEC.first_name, member.member_of_SEC.patronymic),
                    members_degree: member.employee_information.academic_degree? member.employee_information.academic_degree: '',
                    members_job_title: member.employee_information.job_title,
                    members_place_of_work: member.employee_information.place_of_work ? member.employee_information.place_of_work.replace(member.employee_information.place_of_work.split(' ')[0], declineWord(member.employee_information.place_of_work, 'женский')) : '',
                })),
                student_fullname: fullnameStudent,
                specialityCode: group.specialty.code,
                specialtityProgram: group.specialty.name,
                theme: theme ? theme.name : '',
                teacher_last_name: teacher.last_name,
                teacher_np: getInitials(teacher.first_name, teacher.patronymic),
                teacher_degree: teacher_ei.academic_degree,
                teacher_job_title: teacher_ei.job_title.toLowerCase() ,
                reviewer_last_name: theme && theme.reviewer ? theme.reviewer.user.last_name : '',
                reviewer_np: theme && theme.reviewer ? getInitials(theme.reviewer.user.first_name, theme.reviewer.user.patronymic) : '',
                reviewer_degree: theme && theme.reviewer ? theme.reviewer.employee_information.academic_degree : '',
                reviewer_job_title: theme && theme.reviewer ? theme.reviewer.employee_information.job_title : '',
                student_last_name: student.last_name,
                student_np: getInitials(student.first_name, student.patronymic),

                secretary_last_name: localStorage.getItem('last_name'),
                secretary_np: getInitials(localStorage.getItem('first_name'), localStorage.getItem('patronymic')),

                duration: 10,
            };

            // Создаем новую инстанцию Docxtemplater для каждого студента
            const docZip = new PizZip(arrayBuffer);
            const doc = new Docxtemplater(docZip);

            doc.setData(dataToRender);
            doc.render();

            // Генерируем файл и добавляем его в архив
            const output = doc.getZip().generate({ type: 'blob' });
            zip.file(`Протокол_${student.last_name}_${student.first_name}.docx`, output);
        }

        // Генерируем архив и сохраняем его
        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, `Протоколы_о_защите_ВКР ${selectedGroup}.zip`);
        });
    } catch (error) {
        console.error('Ошибка загрузки файла:', error);
    }
};

export default generateProtocolsFunction;

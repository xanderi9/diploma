import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './Protection.module.css';

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};

const ViewProtectionSchedulePersons = ({ general_work_protection_list, personal_work_protection_list, students_list_for_schedule, request_list }) => {

  const getFullName = (studentData) => {
    if (studentData && studentData.user) {
      const { last_name, first_name, patronymic } = studentData.user;
      return `${last_name} ${first_name} ${patronymic}`;
    } else {
      return 'Unknown';
    }
  };

  const distributeStudentsByProtectionDays = () => {
    const groupedSchedule = {};

    personal_work_protection_list.forEach(personalProtection => {
      const { work_protection } = personalProtection;

      // Находим соответствующий объект из general_work_protection_list по work_protection
      const generalProtection = general_work_protection_list.find(general => general.id === work_protection);

      // Пропускаем текущую итерацию, если не найдено соответствия в general_work_protection_list
      if (!generalProtection) {
        return;
      }

      const { date } = generalProtection;
      const { group } = generalProtection;
      const groupName = group ? group.name : 'Unknown';

      if (!groupedSchedule[date]) {
        groupedSchedule[date] = {};
      }

      if (!groupedSchedule[date][groupName]) {
        groupedSchedule[date][groupName] = { students: [] };
      }

      const matchingRequest = request_list.find(req => req.id === personalProtection.request);

      const personalTime = personalProtection.personal_time || '';
      const additionalInfo = personalProtection.additional_information || '';
      const teacherFullName = matchingRequest && matchingRequest.teacher
        ? `${matchingRequest.teacher.last_name} ${matchingRequest.teacher.first_name} ${matchingRequest.teacher.patronymic}`
        : 'Unknown';

      const matchingStudent = students_list_for_schedule.find(student => student.user.username === matchingRequest.student.username);

      if (matchingStudent) {
        groupedSchedule[date][groupName].students.push({
          ...matchingStudent,
          personal_time: personalTime,
          additional_information: additionalInfo,
          vkr_theme: matchingRequest && matchingRequest.theme ? matchingRequest.theme.name : 'Unknown',
          teacher_full_name: teacherFullName,
        });
      }
    });

    // Sorting students by personal_time for each group on each date
    Object.keys(groupedSchedule).forEach(date => {
      Object.keys(groupedSchedule[date]).forEach(group => {
        groupedSchedule[date][group].students.sort((a, b) => a.personal_time.localeCompare(b.personal_time));
      });
    });

    return groupedSchedule;
  };

  const groupedSchedule = distributeStudentsByProtectionDays();

  return (
    <div>
      <h4 className='text-center'>График защит ВКР</h4>
      <div className='mx-md-5'>
        {Object.entries(groupedSchedule).map(([date, groups]) => (
          <div key={date}>
            <h3>{formatDate(date)}</h3>
            {Object.entries(groups).map(([group, { students }]) => (
              <React.Fragment key={`${date}-${group}`}>
                {students.length > 0 && (
                  <Table bordered hover responsive className={styles.protectionTable}>
                    <thead>
                      <tr>
                        <th width='15%'>ФИО</th>
                        <th>Группа</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th width='30%'>Тема ВКР</th>
                        <th>Руководитель</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index}>
                          <td>{getFullName(student)}</td>
                          <td>{group}</td>
                          <td>{formatDate(date)}</td>
                          <td>{student.personal_time}</td>
                          <td>{student.vkr_theme}</td>
                          <td>{student.teacher_full_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProtectionSchedulePersons;

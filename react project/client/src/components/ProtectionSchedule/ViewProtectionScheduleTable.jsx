import React from 'react';
import { Table } from 'react-bootstrap';

function ViewProtectionScheduleTable({ protection_schedule }) {

  const formatDate = (dateString) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
  
    // Ensure day and month are two digits by prepending '0' if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Return the formatted date
    return `${formattedDay}.${formattedMonth}.${year}`;
  };
  

  const generateHeading = (group) => {
    if (!group) return ''; 
  
    const { name, specialty } = group;
    if (!specialty) return '';
  
    const { code: specialityCode, name: specialityName, field_of_study } = specialty;
    if (!field_of_study) return '';
  
    const { code: fieldOfStudyCode, name: fieldOfStudyName } = field_of_study;
  
    if (name.includes('Б') || name.includes('б')) {
      return `Бакалавры по специальности ${specialityCode} "${specialityName}" по программе ${fieldOfStudyCode} "${fieldOfStudyName}"`;
    } else if (name.includes('М') || name.includes('м')) {
      return `Магистры по специальности ${specialityCode} "${specialityName}" по программе ${fieldOfStudyCode} "${fieldOfStudyName}"`;
    } else {
      return `Группа ${name}`;
    }
  };
  

  const { work_protection_list } = protection_schedule;
  console.log(protection_schedule)
  const groupedByGroupName = work_protection_list.reduce((acc, item) => {
    const groupName = item.group ? item.group.name : null;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

  const groupedByDate = work_protection_list.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort();

  const processedGroups = new Set();

  return (
    <>
      <h4 className="mb-4 text-center">График защит ВКР</h4>
      <div className='mx-md-5'>
        {sortedDates.map((date, index) => {
          const dateItems = groupedByDate[date];

          const unprocessedItems = dateItems.filter(item => !processedGroups.has(item.group ? item.group.name : null));

          if (unprocessedItems.length > 1) {
            const uniqueGroupNames = [...new Set(unprocessedItems.map(item => item.group ? item.group.name : null))];
            uniqueGroupNames.forEach(groupName => processedGroups.add(groupName));

            const sortedGroupNames = uniqueGroupNames.sort((a, b) => {
              if (a && b) {
                if (a.includes('М') && b.includes('Б')) return -1;
                if (a.includes('Б') && b.includes('М')) return 1;
                return 0;
              } else {
                return 0;
              }
            });

            return (
              <div key={index} style={{ marginBottom: '20px' }}>
                {sortedGroupNames.map((groupName, groupIdx) => {
                  const groupItem = unprocessedItems.find(item => item.group ? item.group.name === groupName : null);
                  if (!groupItem) return null;
                  const heading = generateHeading(groupItem.group);
                  return <h6 key={groupIdx}>{heading}</h6>;
                })}
                <Table bordered style={{ width: '100%' }} responsive>
                  <thead>
                    <tr>
                      <th>ПП</th>
                      <th>Дата</th>
                      <th>Время</th>
                      <th>Аудитория</th>
                      <th>Уч. группа</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unprocessedItems.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>9:00</td>
                        <td>{item.audience_number}</td>
                        <td>{item.group ? item.group.name : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          } else {
            return null;
          }
        })}

        {Object.keys(groupedByGroupName).sort((a, b) => {
          if (a && b) {
            if (a.includes('М') && b.includes('Б')) return -1;
            if (a.includes('Б') && b.includes('М')) return 1;
            return 0;
          } else {
            return 0;
          }
        }).map((groupName, index) => {
          if (!processedGroups.has(groupName)) {
            const groupItems = groupedByGroupName[groupName];
            processedGroups.add(groupName);

            const groupedByDateForGroup = groupItems.reduce((acc, item) => {
              const date = item.date;
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push(item);
              return acc;
            }, {});

            const sortedGroupDates = Object.keys(groupedByDateForGroup).sort();

            const group = groupItems[0].group;
            const heading = generateHeading(group);

            return (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h6>{heading}</h6>
                <Table bordered style={{ width: '100%' }} responsive>
                  <thead>
                    <tr>
                      <th>ПП</th>
                      <th>Дата</th>
                      <th>Время</th>
                      <th>Аудитория</th>
                      <th>Уч. группа</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedGroupDates.map((date, dateIdx) => {
                      const dateItems = groupedByDateForGroup[date];

                      return dateItems.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{dateIdx * dateItems.length + idx + 1}</td>
                          <td>{formatDate(item.date)}</td>
                          <td>9:00</td>
                          <td>{item.audience_number}</td>
                          <td>{item.group ? item.group.name : item.additional_information}</td>
                        </tr>
                      ));
                    })}
                  </tbody>
                </Table>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}

export default ViewProtectionScheduleTable;

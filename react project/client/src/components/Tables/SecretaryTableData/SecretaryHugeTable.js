import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useFilters } from 'react-table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button, Row, Col } from 'react-bootstrap';
import styles from '../../../container.module.css';
import Filter from '../Filter/Filter';
import hide_cell from '../../../img/hide_cell.png';
import BlockInfo from '../../BlockInfo/BlockInfo';

function SecretaryHugeTable({ info_for_table }) {

  const isFirstRowEmpty = (data) => {
    return data.length > 0 && Object.values(data[0]).every((cell) => cell === null || cell === '');
  };
  

  const [tableData, setTableData] = useState(() => {
    const data = info_for_table.request_list;
    if (isFirstRowEmpty(data)) {
      data.shift(); // Удаляем первый элемент
    }
  

    const newData = data.map((request) => {
      const studentId = request.student.id;
      const student = info_for_table.student_list.find((student) => student.user.last_name === request.student.last_name);
      const work_protection = info_for_table.personal_work_protection_list.find((wp) => wp.request === request.id);
      console.log('защита', work_protection)
      console.log('студент', student)
      return { ...request, student, work_protection }; 
    });
  
    return newData;
  });
  


    const [tableModified, setTableModified] = useState(false);
  
    const [originalData, setOriginalData] = useState([]);

useEffect(() => {
  // Устанавливаем originalData сразу после загрузки данных
  setOriginalData(tableData);
}, [tableData]);
    const [editableCell, setEditableCell] = useState(null);
  
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [isColumnsModified, setIsColumnsModified] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);



    const columns = React.useMemo(
      () => [
        
        {
          Header: '№ п/п',
          accessor: (row, index) => index + 1,
          Filter: Filter
        },
        {
          Header: 'ср.б.',
          accessor: (row) =>  row.student.average_score !== null ? row.student.average_score  : '-',
          Filter: Filter
        },
        {
          Header: 'номер протокола',
          accessor: (row) => row.work_protection && row.work_protection.protocol_number !== null ? row.work_protection.protocol_number : '-',
          Filter: Filter
        },
        
        
        {
          Header: 'дата протокола',
          accessor: (row) => row.work_protection && row.work_protection.date !== null ? row.work_protection.date : '-',
          Filter: Filter
        },
  
        {
          Header: 'Фамилия, Имя, Отчество',
          accessor: (row) => `${row.student.user.last_name} ${row.student.user.first_name} ${row.student.user.patronymic}`,
          Filter: Filter,
        },
        {
          Header: 'Тема',
          
          accessor:  (row) =>  `${row.theme.name}`,
          Filter: Filter,
        },
        {
          Header: 'Руководитель',
          accessor: (row) => `${row.teacher.last_name} ${row.teacher.first_name} ${row.teacher.patronymic}`,
          Filter: Filter,
        },
        {
          Header: 'Консультант',
          accessor: (row) => row.consultant  ? `${row.consultant.last_name} ${row.consultant.first_name} ${row.consultant.patronymic}` : '',
          Filter: Filter,
        },
        {
          Header: 'Рецензент',
          accessor: (row) => row.theme.reviewer? `${row.theme.reviewer.last_name} ${row.theme.reviewer.first_name} ${row.theme.reviewer.patronymic}` : '',
          Filter: Filter,
        },
        {
          Header: 'организация',
          accessor: (row) =>  row.theme.company? `${row.theme.company.name} ${row.theme.company.last_name_of_responsible} ${row.theme.company.first_name_of_responsible} ${row.theme.company.patronymic_name_of_responsible}
           ${row.theme.company.job_title_of_resposible} ${row.theme.company.additional_information}` : '',
           Filter: Filter,
        },
        {
          Header: 'номер зачетки',
          accessor: (row) =>  row.student.record_book_number ? `${row.student.record_book_number}`: '-',
           Filter: Filter,
        },
        {
          Header: 'Телефон',
          accessor: (row) =>  `${row.student.user.phone}`,
          Filter: Filter,
        },
        {
          Header: 'Email',
          accessor: (row) =>  `${row.student.user.email}`,
          Filter: Filter,
        },
        {
          Header: 'бюджет/платный',
          accessor: (row) =>  row.student.basis_of_study ? `${row.student.basis_of_study}` : '-',
          Filter: Filter,
        },
        {
          Header: 'оценка на предзащите/ преддипломная практика',
          accessor: (row) =>  row.preprotection_grade ? `${row.preprotection_grade}` : '-',
          Filter: Filter,
        },
        {
          Header: 'оценка на защите',
          accessor: (row) => (row.work_protection && row.work_protection.final_grade != null) ? `${row.work_protection.final_grade}` : '-',
          Filter: Filter,
      },
      
        
        {
          Header: 'дата рождения',
          accessor: (row) =>  row.student.date_of_birth ? `${row.student.date_of_birth}` : '-',
          Filter: Filter,
        },
        {
          Header: 'год окончания предыдущ образования',
          accessor: (row) =>  row.student.year_of_prev_education_completion ? `${row.student.year_of_prev_education_completion}`: '-',
          Filter: Filter,
        },
        {
          Header: 'форма предыдущего образования',
          accessor: (row) =>  `${row.student.form_of_prev_education}`,
          Filter: Filter,
        },
        {
          Header: 'год поступления',
          accessor: (row) =>  `${row.student.year_of_admission}`,
          Filter: Filter,
        },
        {
          Header: 'особые отметки',
          accessor: (row) =>  `${row.student.special_marks}`,
          Filter: Filter,
        },
        
        {
          Header: 'приказы',
          columns: [
            {
              Header: 'допуск',
              accessor: (row) => '',
              Filter: Filter,
              isVisible: true
            },
            {
              Header: 'тема',
              accessor: (row) => '',
              Filter: Filter,
              isVisible: true
            },
            {
              Header: 'изменение темы',
              accessor: (row) => '',
              Filter: Filter,
              isVisible: true
            },
            {
              Header: 'рецензент',
              accessor: (row) => '',
              Filter: Filter,
              isVisible: true
            },
            {
              Header: 'отчисление',
              accessor: (row) =>  '',
              Filter: Filter,
              isVisible: true
            },
            {
              Header: 'с какого числа отчисление',
              accessor: (row) =>  '',
              Filter: Filter,
              isVisible: true
            }
          ]
        },
        {
          Header: 'отметки о выполнении',
          columns: [
            
        {
          Header: 'долги',
          accessor: (row) =>  row.student.number_of_debts ? `${row.student.number_of_debts}` : '-',
          Filter: Filter
        },
        {
          Header: 'справка о выполнении уч. плана',
          accessor: (row) => row.student.certificate_of_curriculum_completion ? `${row.student.certificate_of_curriculum_completion}`: '-',
          Filter: Filter
        },
        {
          Header: 'сдана зачетка',
          accessor: (row) =>  row.student.record_book_submitted ? `${row.student.record_book_submitted}` : 'нет',
          Filter: Filter
        },
        {
          Header: 'сдана пояснительная записка',
          accessor: (row) => (row.explanatory_note_submitted ? 'да' : 'нет'),
          Filter: Filter
        },
        {
          Header: 'красный диплом',
          accessor: (row) => (row.student.diploma_with_honors ? 'да' : 'нет'),
          Filter: Filter
        },
        {
          Header: 'согласие на публикацию',
          accessor: (row) => (row.publication_agree ? 'да' : 'нет'),
          Filter: Filter
        },
        {
          Header: 'отзыв',
          accessor: (row) =>  row.teacher_review ? `${row.teacher_review}`: '-',
          Filter: Filter
        },
        {
          Header: 'рецензия',
          accessor: (row) =>  row.review ? `${row.review}` : '-',
          Filter: Filter
        },
        {
          Header: 'Акт о внедрении',
          accessor: (row) => (row.implementation_act ? 'да' : 'нет'),
          Filter: Filter
        },
        {
          Header: 'отчет о плагиате',
          accessor: (row) => (row.plagarism_report ? row.plagarism_report : 'нет'),
          Filter: Filter
        },
        {
          Header: 'заявление на последипломный отпуск',
          accessor: (row) => (row.student.application_for_postgraduate_leave ? row.student.application_for_postgraduate_leave: 'нет'),
          Filter: Filter
        },
        {
          Header: 'рекомендован к поступлению',
          accessor: (row) =>  row.student.recommended_for_admission ? `${row.student.recommended_for_admission}` : '-',
          Filter: Filter
        },
          ]
        },
        {
          Header: 'вид ВКР',
          accessor: (row) =>  row.type_of_fqw ? `${row.type_of_fqw}` : '-',
          Filter: Filter,
          headerProps: { rowSpan: 2 },
        },
        {
          Header: 'ВКР по заявке',
          accessor: (row) =>  row.theme.fqw_by_application ? `${row.theme.fqw_by_application}` : '-',
          Filter: Filter,
        },
        {
          Header: 'ВКР на англ. языке',
          accessor: (row) => (row.fqw_in_english ? 'да' : 'нет'),
          Filter: Filter,
        },
        {
          Header: 'ВКР рекомендовано',
          accessor: (row) =>  row.fqw_recommended ? `${row.fqw_recommended}` : '-',
          Filter: Filter,
        },
        {
          Header: 'наличие спец. условий',
          accessor: (row) => (row.special_conditions ? 'да' : 'нет'),
          Filter: Filter,
        },
      ],
      []
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      allColumns,
      toggleHideColumn,
    } = useTable(
      { columns, data: tableData },
      useFilters // Use the useFilters plugin hook
    );
    const [editedCellValues, setEditedCellValues] = useState({});
  
    const handleClick = (cell) => {
      if (editableCell && editableCell.rowIndex === cell.row.index && editableCell.columnId === cell.column.id) {
        // If the clicked cell is already in edit mode, do nothing
        return;
      }
      setEditableCell({
        rowIndex: cell.row.index,
        columnId: cell.column.id,
      });
    };
  
    const handleCellChange = (e, rowIndex, columnId) => {
      const { value } = e.target;
      setEditedCellValues((prevState) => ({
        ...prevState,
        [`${rowIndex}-${columnId}`]: value,
      }));
    };
    
    const handleBlur = (rowIndex, columnId) => {
      const editedValue = editedCellValues[`${rowIndex}-${columnId}`];
      const updatedData = tableData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: editedValue !== undefined ? editedValue : row[columnId],
          };
        }
        return row;
      });
      setTableData(updatedData);
      setEditedCellValues({});
      setEditableCell(null);
      // Устанавливаем состояние, что таблица была изменена
      setTableModified(true);
    };
    
    const saveChanges = () => {
      // Здесь вы можете добавить логику для сохранения изменений
      // Например, отправку данных на сервер или другое место
      // После сохранения изменений сбросьте состояние обратно в false
      setTableModified(false);
    };
  
    const handleKeyDown = (e, rowIndex, columnId) => {
      if (e.key === 'Enter') {
        handleBlur(rowIndex, columnId);
      }
    };
  
    useEffect(() => {
      window.dispatchEvent(new Event('resize')); // Trigger resize event to adjust table layout
    }, [tableData]);
  
    const toggleColumnVisibility = (columnId) => {
      const newHiddenColumns = hiddenColumns.includes(columnId)
        ? hiddenColumns.filter((id) => id !== columnId)
        : [...hiddenColumns, columnId];
      setHiddenColumns(newHiddenColumns);
      toggleHideColumn(columnId);
    };
  
    useEffect(() => {
      // Apply hidden columns when component mounts
      setHiddenColumns([]);
    }, []);
  
    const exportToExcel = () => {
      const tableClone = document.getElementById('dataTable').cloneNode(true);
      const hiddenCells = tableClone.querySelectorAll(`.${styles.hidden}`);
      hiddenCells.forEach((cell) => cell.remove());
  
      const ws = XLSX.utils.table_to_sheet(tableClone);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, 'Data.xlsx');
    };
  
    const resetTable = () => {
      if (tableModified || hiddenColumns.length > 0 || isColumnsModified) {
        setTableData(originalData);
        setHiddenColumns([]);
        setEditableCell(null);
        setIsColumnsModified(false); // Reset the modification state
        setEditedCellValues({}); // Clear edited cell values
        // Restore hidden columns
        hiddenColumns.forEach((columnId) => {
          toggleHideColumn(columnId);
        });
        setTableModified(false); // Reset table modification state
      }
    };
    
    
    
    
    
    
    
    
    
  
    const showOnlyColumnsByIndex = (columnIndexesToShow) => {
  if (!headerGroups || !headerGroups.length) return; // Check if headerGroups is defined and not empty

  if (isColumnsModified) return; // Do nothing if columns have been modified

  const newHiddenColumns = allColumns.map((column, index) =>
    columnIndexesToShow.includes(index) ? '' : column.id
  ).filter(columnId => columnId !== '');
  setHiddenColumns(newHiddenColumns);
  newHiddenColumns.forEach((columnId) => {
    toggleHideColumn(columnId);
  });
  setIsColumnsModified(true); // Set modification state
};

  
    const tableClassName = styles.huge_table;
    
    return (
      <div>
      <h4 className="mb-4 text-center">Таблица данных</h4>
  
      <BlockInfo>
  Вы можете фильтровать данные, используя кнопку-фильтр в нужной ячейке, 
        а также скрывать столбцы, используя кнопку-крестик. Готовые данные могут быть экспортированы в эксель.
        Для удобства использования были составлены готовые списки. Для того чтобы сменить список, необходимо нажать на "Сброс" и выбрать необходимый список.
      </BlockInfo>
      <Row className='mb-3 ml-5'>
        <Col md={3}>
        <Button variant='none' onClick={exportToExcel} className={styles.export_button}>
        Export to Excel
      </Button>
        </Col>
        <Col md={3}>
        <Button variant='none' onClick={resetTable} className={styles.reset_button}>
        Сброс
      </Button>
        </Col>
        {tableModified && (
          <Col md={3}>
          <Button variant="primary" onClick={saveChanges}>
            Сохранить изменения
          </Button>
         </Col>
        )}
  
  
      </Row>
      
      <h5 >Формирование списков</h5>
      <Row className='my-3 ml-5'>
        <Col>
      <Button onClick={() => showOnlyColumnsByIndex([0, 4, 9, 10, 11, 12, 13, 16, 17, 18, 19, 43])} className={styles.button1}>
       Внутренние данные
      </Button>
      </Col>
      <Col>
      <Button onClick={() => showOnlyColumnsByIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, ])}  className={styles.button1}>
       Список на защиту
      </Button>
      </Col>
      <Col>
      <Button onClick={() => showOnlyColumnsByIndex([0, 4, 20, 39, 40, 41, 42])}  className={styles.button1}>
       Отчет председателя
      </Button>
      </Col>
      <Col>
      <Button onClick={() => showOnlyColumnsByIndex([0, 4, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38])}  className={styles.button1}>
       Контроль
      </Button>
      </Col>
      <Col>
      <Button onClick={() => showOnlyColumnsByIndex([0, 4, 21, 22, 23, 24, 25, 26])}  className={styles.button1}>
       Приказы
      </Button>
      </Col>
      </Row>
    
  
      <table {...getTableProps()} id="dataTable" className={`${styles.huge_table} mb-3`}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    display: hiddenColumns.includes(column.id) ? 'none' : '',
                    position: 'relative',
                    paddingRight: '25px',
                  }}
                >
                  {column.render('Header')}
                  {column.canFilter && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '0',
                        bottom: '0',
                        marginRight: '-15px',
                        marginBottom: '-9px'
                      }}
                    >
                      <Filter column={column} />
                    </div>
                  )}
                  {column.canFilter && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        marginRight: '-15px',
                        marginTop: '-10px'
                      }}
                    >
                      <Button variant="none" onClick={() => toggleColumnVisibility(column.id)}>
                        <img src={hide_cell} width={25} height={25} alt="Скрыть" />
                      </Button>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
       
  <td
    {...cell.getCellProps()}
    className={`${styles.data_cell} ${hiddenColumns.includes(cell.column.id) ? styles.hidden : ''}`}
    style={{ 
      display: hiddenColumns.includes(cell.column.id) ? 'none' : '',
      width: cell.column.width 
    }}
    onClick={() => handleClick(cell)} 
  >
    <div
      contentEditable={editableCell && editableCell.rowIndex === rowIndex && editableCell.columnId === cell.column.id}
      onInput={(e) => handleCellChange(e, rowIndex, cell.column.id)}
      onKeyDown={(e) => handleKeyDown(e, rowIndex, cell.column.id)}
      onBlur={() => handleBlur(rowIndex, cell.column.id)}
      suppressContentEditableWarning
    >
      {cell.render('Cell')}
    </div>
  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    
    </div>
    );
  }
  
  export default SecretaryHugeTable;
  
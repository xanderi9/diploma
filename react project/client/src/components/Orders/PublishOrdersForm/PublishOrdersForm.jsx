import React, { useState, useRef } from 'react';
import BlockInfo from '../../BlockInfo/BlockInfo';
import styles from './PublishOrdersForm.module.css';
import {Form, Row, Col, Button} from 'react-bootstrap'


function PublishOrdersForm() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const inputRef = useRef(null);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const newFileNames = files.map(file => file.name);
    setSelectedFiles([...selectedFiles, ...files]);
    setFileNames([...fileNames, ...newFileNames]);
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    const newFileNames = files.map(file => file.name);
    setSelectedFiles([...selectedFiles, ...files]);
    setFileNames([...fileNames, ...newFileNames]);
  };

  const handleFormClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <h4 className="mb-4 text-center">Загрузка приказов</h4>
      <BlockInfo darkMode={darkMode}>
        1. Загрузите приказы в формате pdf и они станут доступны всем пользователям в системе
      </BlockInfo>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={styles.form_drag}
        onClick={handleFormClick}
      >
        {dragging ? ('Файлы выбраны') : (<h6>Перетащите файлы сюда или кликните для выбора</h6>)}
        {fileNames.length > 0 && (
        
              <div className={styles.form_published}> 
            {fileNames.map((fileName, index) => (
              
              <div key={index}>{fileName}
              </div>
 
            ))}
          </div>
        )}
      </div>
      

      <input
        type="file"
        accept=".pdf"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        multiple
      />
      <BlockInfo darkMode={darkMode}>
        2. Укажите тип приказа
      </BlockInfo>

      <Form.Group as={Row} controlId="dropdown" className="justify-content-center">
       <Form.Label column sm={3} className="d-flex align-items-center">Форма обучения</Form.Label>
       <Col sm={7}>
         <Form.Control as="select">
           <option value="На утверждение темы ">На утверждение темы </option>
           <option value="На изменение темы">На изменение темы</option>
           <option value="На отчисление">На отчисление</option>
         </Form.Control>
       </Col>
     </Form.Group>
     <Row className='justify-content-center mt-4 mb-2'>
      <Col md={1}>
      <Button> Опубликовать
       </Button>
      </Col>
     </Row>
     
    </>
  );
}

export default PublishOrdersForm;

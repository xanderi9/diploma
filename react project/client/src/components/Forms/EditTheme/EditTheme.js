import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import styles from './EditTheme.module.css';

function EditTheme({ data, onSave, onCancel }) {
  const [theme, setTheme] = useState(data.theme || '');
  const [organizationName, setOrganizationName] = useState(data.organization.name || '');
  const [fioResponsible, setFioResponsible] = useState(data.organization.responsible || '');
  const [postResponsible, setPostResponsible] = useState(data.organization.position || '');
  const [additionalResponsible, setAdditionalResponsible] = useState(data.organization.additional || '');
  const [isFree, setIsFree] = useState(data.occupied === 'нет');
  const [haveOrganization, setHaveOrganization] = useState(data.organization.name !== '');

  useEffect(() => {
    setHaveOrganization(data.organization.name !== '');
    setTheme(data.theme || '');
    setOrganizationName(data.organization.name || '');
    setFioResponsible(data.organization.responsible || '');
    setPostResponsible(data.organization.position || '');
    setAdditionalResponsible(data.organization.additional || '');
    setIsFree(data.occupied === 'нет');
  }, [data]);

  const handleSaveChanges = () => {
    const updatedData = {
      theme,
      organization: {
        name: organizationName,
        responsible: fioResponsible,
        position: postResponsible,
        additional: additionalResponsible
      },
      occupied: isFree ? 'нет' : 'да',
      actions: data.actions
    };
    onSave(updatedData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form className="py-2 my-2 mx-5">
      <Form.Group as={Row}>
        <Form.Label column sm={4}>Тема ВКР</Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="тема ВКР"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>Связь темы ВКР с организацией</Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            inline
            type="radio"
            label="связана"
            checked={haveOrganization}
            onChange={() => setHaveOrganization(true)}
          />
          <Form.Check
            inline
            type="radio"
            label="не связана"
            checked={!haveOrganization}
            onChange={() => setHaveOrganization(false)}
          />
        </Col>
      </Form.Group>
      {haveOrganization && (
        <>
          <Form.Group as={Row} className="organization-fields">
            <Form.Label column sm={4}>Наименование организации</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="organization-fields">
            <Form.Label column sm={4}>ФИО ответственного</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={fioResponsible}
                onChange={(e) => setFioResponsible(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="organization-fields">
            <Form.Label column sm={4}>Должность ответственного</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={postResponsible}
                onChange={(e) => setPostResponsible(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="organization-fields">
            <Form.Label column sm={4}>Дополнительно</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={additionalResponsible}
                onChange={(e) => setAdditionalResponsible(e.target.value)}
              />
            </Col>
          </Form.Group>
        </>
      )}
      <Form.Group as={Row} className="organization-fields">
        <Form.Label column sm={4}>Занято</Form.Label>
        <Col sm={8}>
          <Form.Check
            type="checkbox"
            label="Занято"
            checked={isFree}
            onChange={() => setIsFree(!isFree)}
          />
        </Col>
      </Form.Group>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Button variant="none" className={styles.cancel_button} onClick={handleCancel}>Отмена</Button>
        </div>
        <div className="col-md-4">
          <Button variant="none" className={styles.save_button} onClick={handleSaveChanges}>Сохранить изменения</Button>
        </div>
      </div>
    </Form>
  );
}

export default EditTheme;

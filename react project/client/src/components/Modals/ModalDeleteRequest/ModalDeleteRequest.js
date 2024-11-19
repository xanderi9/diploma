import React, { Component } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { Button } from 'react-bootstrap';

export default class ModalDeleteRequest extends Component {
  render() {
    const { show, handleClose, handleDelete, darkMode } = this.props;
    const content = (
      <div>
        <h6>Вы уверены?</h6>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleClose}>Отмена</Button>
          <Button variant="danger" onClick={handleDelete}>Удалить</Button>
        </div>
      </div>
    );
    return (
      <BaseModal
        show={show}
        handleClose={handleClose}
        title={'Подтвердите действие'}
        content={content}
        darkMode={darkMode}
      />
    );
  }
}

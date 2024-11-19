import React, { Component } from 'react'
import BaseModal from '../BaseModal/BaseModal'

export default class NoteModal extends Component {
    
  render() {
    const { show, handleClose, darkMode } = this.props;
    const content = (
        <div>
          <p>На данный момент Вы можете сообщить о проблеме, отправив ее описание по любому из следующих адресов:</p>
          <ul>
            <li>masha.edunova@gmail.com</li>
            <li>zas1705@mail.ru</li>
          </ul>
        </div>
      );
    return (
      <BaseModal show={this.props.show} 
      handleClose={this.props.handleClose} 
      title={'Поддержка'}
      content={content} 
      darkMode={darkMode}
      >
        
        </BaseModal>
    )
  }
}

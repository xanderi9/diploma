import React, { Component } from 'react'
import BaseModal from '../BaseModal/BaseModal'

export default class ModalConfirm extends Component {
    
  render() {
    const { show, handleClose, darkMode } = this.props;
    const content = (
        <div>
          <h6>Вы уверены?</h6>
          
        </div>
      );
    return (
      <BaseModal show={this.props.show} 
      handleClose={this.props.handleClose} 
      title={'Подтвердите действие'}
      content={content} 
      darkMode={darkMode}
      >
        
        </BaseModal>
    )
  }
}

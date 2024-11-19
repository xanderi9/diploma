import React, { Component } from 'react'
import BaseModal from '../BaseModal/BaseModal'

export default class RequestsModal extends Component {
    
  render() {
    const { show, handleClose, darkMode } = this.props;
    const content = (
        <>
        <div className="block-info mb-4">
        <div className="row justify-content-center">
          <div className="col-md-1 col-2 d-flex align-items-center">
            <img src="/img/info.png" className="info" width="25" height="25" alt="Icon" loading="lazy" />
          </div>
          <div className="col-md-11 col-10">
            Вы можете в одностороннем порядке принять или отклонить заявки от выпускников. Если Вы принимаете заявку,
            то можете утвердить тему, поставив галочку в соответствующее окно. Если Вы считаете, что тему нужно
            подкорректировать, оставьте поле чекбокса пустым.
          </div>
        </div>
      </div>
      <div className="request_fields">
        {requestData.map((data, index) => (
          <RequestField key={index} data={data} />
        ))}
      </div>
      </>
      );
    return (
      <BaseModal show={this.props.show} 
      handleClose={this.props.handleClose} 
      title={'Текущие заявки'}
      content={content} 
      darkMode={darkMode}
      >
        
        </BaseModal>
    )
  }
}

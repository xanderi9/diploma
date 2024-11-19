import React, { Component } from 'react'
import styles from '../../ProfileBlocks.module.css'
import {Col, Row, Button} from 'react-bootstrap'
import download from '../../../../img/download.png'
import open from '../../../../img/open.png'
import {Link} from 'react-router-dom'

export default class ActionsCardSecretary extends Component {
  render() {
    return (
        <div class={`${styles.card} actions`}>
<p class="text-center px-1 py-2 fw-bold"> Действия и списки </p>
<Row className='justify-content-center my-1'>
        <Col md={9}>
        <Link  variant="none" to='/secretary_table_data'>Таблица данных ВКР</Link>

        </Col>
        <Col md={1}>
        <img src={open} width="20" height="20" alt="profile_pic" loading="lazy" />
        </Col>
        <Col md={1}>
          <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </Col>
      </Row>

      <Row className='justify-content-center my-1'>
        <Col md={9}>
        <Link  variant="none" to='/create_schedule_protection'>График защит ВКР</Link>
        </Col>
        <Col md={1}>
          <img src={open} width="20" height="20" alt="profile_pic" loading="lazy" />
        </Col>
        <Col md={1}>
          <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </Col>
      </Row>

     
      </div>
    )
  }
}

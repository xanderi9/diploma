import React, { Component } from 'react'
import styles from './Search.module.css';
import { Button, Container, Row, Form, Col, InputGroup } from 'react-bootstrap';
import search from './search.png';

export default class Search extends Component {
  render() {
    return (
        <div className={styles.search_area}>
      <InputGroup>
      
          <Col md={1} xs={2}>
                <img src={search} width="40%" alt="Icon" loading="lazy" />
          </Col>
          <Col md={11} xs={10}>
            <Form.Control type="text" className={styles.search_form} placeholder="ФИО ученика" aria-label="Поиск" />
          </Col>

      </InputGroup >
    </div>
    )
  }
}

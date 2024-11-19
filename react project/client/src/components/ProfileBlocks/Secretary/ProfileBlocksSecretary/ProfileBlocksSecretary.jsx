import React, { Component } from 'react'
import styles from '../../ProfileBlocks.module.css'
import { Container, Row } from 'react-bootstrap';
import ProfileCardSecretary from '../ProfileCardSecretary/ProfileCardSecretary';
import ActionsCardSecretary from '../ActionsCardSecretary/ActionsCardSecretary';
import DocumentsCardSecretary from '../DocumentsCardSecretary/DocumentsCardSecretary';
import ThemesCard from '../../ThemesCard/ThemesCard'

export default class ProfileBlocksSecretary extends Component {

  render() {
    const secretaryData=this.props.secretaryData
    const themes_list=secretaryData.theme_list_department

    console.log('ct', secretaryData) 
    return (
    <Container>
      <Row className="p-4">
      <div class={styles.left_column}>

       <ProfileCardSecretary secretaryData={secretaryData}/>
        </div>
        <div class={styles.right_column}>
            <ActionsCardSecretary/>
            <DocumentsCardSecretary/>
            <ThemesCard themes_list={themes_list}/>
        </div>
      </Row>
      </Container>
    )
  }
}

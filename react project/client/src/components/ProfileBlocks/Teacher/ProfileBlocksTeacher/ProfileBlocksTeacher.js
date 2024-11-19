import React, { Component } from 'react'
import styles from '../../ProfileBlocks.module.css';
import { Container, Row } from 'react-bootstrap';
import ProfileCardTeacher from '../ProfileCardTeacher/ProfileCardTeacher';
import RequestsCard from '../RequestsCard/RequestsCard'; 
import TeacherDocumentsCard from '../TeacherDocumentsCard/TeacherDocumentsCard'; 
import ThemesCard from '../../ThemesCard/ThemesCard';

export default class ProfileBlocksTeacher extends Component {
    
  render() {
    const themes_list = this.props.themes_list
    const teacherData = this.props.data
   
    

    return (
    <Container>
      <Row className="p-4">
      <div class={styles.left_column}>

       <ProfileCardTeacher teacherData={teacherData}/>
        </div>
        <div class={styles.right_column}>
            <RequestsCard />
        <TeacherDocumentsCard/>
        <ThemesCard themes_list={themes_list}/>
        </div>
      </Row>
      </Container>
    )
  }
}



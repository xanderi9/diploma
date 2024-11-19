import React, { Component } from 'react'
import styles from '../ProfileBlocks.module.css';
import { Container, Row } from 'react-bootstrap';
import ProfileCard from '../Student/ProfileCard/ProfileCard.js';
import ChooseTeacherCard from './ChooseTeacherCard/ChooseTeacherCard.js';
import ActionsCard from './ActionsCard/ActionsCard.js';
import DocumentsCard from './DocumentsCard/DocumentsCard.js';
import MethodRecommendationsCard from './MethodRecommendationsCard/MethodRecommendationsCard.js';

export default class ProfileBlocks extends Component {

  render() {
    const studentData=this.props.studentData
 
    
    return (
    <Container>
      <Row className="p-4">
      <div class={styles.left_column}>

       <ProfileCard studentData={studentData}/>
        </div>
        <div class={styles.right_column}>
        <ChooseTeacherCard/>
        <ActionsCard studentData={studentData} />
        <DocumentsCard/>
        <MethodRecommendationsCard/>
        </div>
      </Row>
      </Container>
    )
  }
}

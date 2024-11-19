import React, { Component } from 'react'
import taskForGraduateWork from '../../../documents/TaskForGraduateWork/TaskForGraduateWork.pdf'
import teacherReview from '../../../documents/TeacherReview/TeacherReview.pdf'
import complexTeacherReview from '../../../documents/ComplexTeacherReview/ComplexTeacherReview.pdf'
import scheduleComplex from '../../../documents/ScheduleComplex/ScheduleComplex.pdf'
import download from '../../../img/download.png'



export default class TeacherDocuments extends Component {
  render() {
    return (
        <>
        <table width={'100%'}>
    <tr>
    <td>
    <a href={taskForGraduateWork} download="Задание на ВКР.pdf">Задание на ВКР</a>   </td>
        <td>
        <a href={taskForGraduateWork} download="Задание на ВКР.pdf">
  <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
  </a>
        </td>
    </tr>
    <tr>
    <td>
    <a href={teacherReview} download="Отзыв о работе обучающегося.pdf">Отзыв о работе обучающегося</a>   </td>
        <td>
        <a href={teacherReview} download="Отзыв о работе обучающегося.pdf">
  <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
  </a>
        </td>
    </tr>
  
     <tr>
    <td>
    <a href={complexTeacherReview} download="Отзыв о работе обучающегося (комплексная ВКР).pdf">Отзыв о работе обучающегося (комплексная ВКР)</a>   
    </td>
        <td> <a href={complexTeacherReview} download="Отзыв о работе обучающегося (комплексная ВКР).pdf">
  <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
  </a>
  </td>
    </tr>

    <tr>
    <td>
    <a href={scheduleComplex} download="Форма плана-графика (комплексная ВКР).pdf">Форма плана-графика (комплексная ВКР)</a>   
    </td>
        <td> <a href={scheduleComplex} download="Форма плана-графика (комплексная ВКР).pdf">
  <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
  </a>
  </td>
    </tr>

  </table>
                 
              
        </>
    )
  }
}

import React, { useState } from 'react';
import styles from "./GenerateApplicationForm.module.css";
import styles_base from "../../Forms/FormsBase.module.css";
import BlockInfo from '../../BlockInfo/BlockInfo';
import { Form, Button, Col, Row } from 'react-bootstrap';
import generateDocument from './GenerateDocumentFunction';
import { useLocation } from 'react-router-dom';

const направления = {
  "09.03.02-Информационные системы и технологии": "09.03.02.30-Информационные системы и технологии",
  "09.04.01-Информатика и вычислительная техника": "09.04.01.10-Интеллектуальные информационные системы",
  "09.04.02-Информационные системы и технологии": [
    "09.04.02.01-Информационно-управляющие системы",
    "09.04.02.05-Информационные системы дистанционного зондирования Земли"
  ]
};

function GenerateApplicationForm({generating_info}) {
  const teacher = generating_info.request_without_student[0].teacher
  const ei_teacher = generating_info.teacher_employee_information[0] ? generating_info.teacher_employee_information[0] : null
  const ei_consultant = generating_info.consultant_employee_information[0] ? generating_info.consultant_employee_information[0] : null

  const consultant = generating_info.request_without_student[0].consultant
  const location = useLocation();
  const action = new URLSearchParams(location.search).get('action');

  const [selectedKey, setSelectedKey] = useState(generating_info.student[0].group.specialty.code);
  const [selectedValue, setSelectedValue] = useState(generating_info.student[0].group.specialty.field_of_study.code);
  const [showFields, setShowFields] = useState(false);

  const [fullname, setFullname] = useState(`${generating_info.student[0].user.last_name} ${generating_info.student[0].user.first_name} ${generating_info.student[0].user.patronymic}`);
  const [phone, setPhone] = useState(generating_info.student[0].user.phone);
  const [email, setEmail] = useState(generating_info.student[0].user.email);
  const [course, setCourse] = useState(generating_info.student[0].group.course_number);
  const [group, setGroup] = useState(generating_info.student[0].group.name);
  const [formOfEducation, setFormOfEducation] = useState(generating_info.student[0].form_of_education);
  const [basisOfStudy, setBasisOfStudy] = useState(generating_info.student[0].basis_of_study);
  const [theme, setTheme] = useState(generating_info.request_without_student[0].theme.name);

  const [teacherFullname, setTeacherFullname] = useState(`${teacher.last_name} ${teacher.first_name} ${teacher.patronymic}`);
  
  const [teacherAcademicDegree, setTeacherAcademicDegree] = useState(ei_teacher ? ei_teacher.academic_degree : '');
  const [teacherAcademicTitle, setTeacherAcademicTitle] = useState( ei_teacher ? ei_teacher.academic_title: '');
  const [teacherJobTitle, setTeacherJobTitle] = useState( ei_teacher ? ei_teacher.job_title: '');
  const [teacherPlaceOfWork, setTeacherPlaceOfWork] = useState( ei_teacher ? ei_teacher.place_of_work: '');

  const [consultantFullname, setConsultantFullname] = useState(consultant ? `${consultant.last_name} ${consultant.first_name} ${consultant.patronymic}` : '');
  const [consultantAcademicDegree, setConsultantAcademicDegree] = useState( ei_consultant ? ei_consultant.academic_degree : '');
  const [consultantAcademicTitle, setConsultantAcademicTitle] = useState( ei_consultant ? ei_consultant.academic_title : '');
  const [consultantJobTitle, setConsultantJobTitle] = useState(ei_consultant ? ei_consultant.job_title :'');
  const [consultantPlaceOfWork, setConsultantPlaceOfWork] = useState( ei_consultant ? ei_consultant.place_of_work : '' );

  const handleRadioChange = (e) => {
    setShowFields(e.target.value === 'option1');
  };

  return (
    <>
      <h4 className="mb-2 text-center">Данные для заявления на ВКР</h4>
      <Row className='justify-content-center'>
        <Col md={10}>
          <BlockInfo>
            Проверьте данные в форме, при необходимости внесите правки и сформируйте заявление на утверждение темы ВКР
          </BlockInfo>
          <Form className="px-4 py-2 m-2">
            <h5 className="text-center mb-2">Данные выпускника</h5>
            <div className={styles_base.block_form}>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">ФИО</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="ФИО" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Контактный телефон</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Email</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Курс</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="4" value={course} onChange={(e) => setCourse(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Группа</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="группа" value={group} onChange={(e) => setGroup(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Направление подготовки/специальность:</Form.Label>
                <Col sm={8}>
                  <Form.Control as="select" className={styles_base.form_control} value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                    <option value="">{generating_info.student[0].group.specialty.code} "{generating_info.student[0].group.specialty.name}"</option>
                    {Object.keys(направления).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Профиль/специализация:</Form.Label>
                <Col sm={8}>
                  <Form.Control as="select" className={styles_base.form_control} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="">{generating_info.student[0].group.specialty.field_of_study.code} "{generating_info.student[0].group.specialty.field_of_study.name}"</option>
                    {Array.isArray(направления[selectedKey]) ? направления[selectedKey].map(value => (
                      <option key={value} value={value}>{value}</option>
                    )) : <option value={направления[selectedKey]}>{направления[selectedKey]}</option>}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Форма обучения</Form.Label>
                <Col sm={8}>
                  <Form.Control as="select" className={styles_base.form_control} value={formOfEducation} onChange={(e) => setFormOfEducation(e.target.value)}>
                    <option value="-">-</option>
                    <option value="очная">Очная</option>
                    <option value="заочная">Заочная</option>
                    <option value="очно-заочная">Очно-заочная</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              
                <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Основа обучения</Form.Label>
                <Col sm={8}>
                  <Form.Control as="select" className={styles_base.form_control} value={basisOfStudy} onChange={(e) => setBasisOfStudy(e.target.value)}>
                    <option value="-">-</option>
                    <option value="за счет бюджетных ассигнований федерального бюджета">за счет бюджетных ассигнований федерального бюджета</option>
                    <option value="на условиях договора об оказании платных образовательных услуг">на условиях договора об оказании платных образовательных услуг</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Тема ВКР</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="тема вкр" value={theme} onChange={(e) => setTheme(e.target.value)} />
                </Col>
              </Form.Group>
            </div>
            <h5 className="my-4 text-center">Данные руководителя</h5>
            <div className={styles_base.block_form}>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">ФИО руководителя</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="ФИО руководителя" value={teacherFullname} onChange={(e) => setTeacherFullname(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Ученая степень</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="ученая степень" value={teacherAcademicDegree} onChange={(e) => setTeacherAcademicDegree(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Звание</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="звание" value={teacherAcademicTitle} onChange={(e) => setTeacherAcademicTitle(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Должность</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="должность" value={teacherJobTitle} onChange={(e) => setTeacherJobTitle(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4} className="d-flex align-items-center">Место работы</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" className={styles_base.form_control} placeholder="место работы" value={teacherPlaceOfWork} onChange={(e) => setTeacherPlaceOfWork(e.target.value)} />
                </Col>
              </Form.Group>
            </div>

            <h5 className="my-4 text-center">Данные консультанта</h5>
            <div className={styles_base.block_form}>
              <Form.Group as={Row}>
                <Form.Label column sm={5} className="d-flex align-items-center">Есть консультант</Form.Label>
                <Col sm={7}>
                  <Form.Check
                    inline
                    type="radio"
                    label="есть"
                    value="option1"
                    name="options"
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="нет"
                    value="option2"
                    name="options"
                    onChange={handleRadioChange}
                    defaultChecked
                  />
                </Col>
              </Form.Group>
              {showFields && (
                <div id="fieldsToShow">
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="d-flex align-items-center">ФИО консультанта</Form.Label>
                    <Col sm={8}>
                      <Form.Control type="text" className={styles_base.form_control} placeholder="ФИО консультанта" value={consultantFullname} onChange={(e) => setConsultantFullname(e.target.value)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="d-flex align-items-center">Ученая степень</Form.Label>
                    <Col sm={8}>
                      <Form.Control type="text" className={styles_base.form_control} placeholder="ученая степень" value={consultantAcademicDegree} onChange={(e) => setConsultantAcademicDegree(e.target.value)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="d-flex align-items-center">Звание</Form.Label>
                    <Col sm={8}>
                      <Form.Control type="text"  className={styles_base.form_control} placeholder="звание" value={consultantAcademicTitle} onChange={(e) => setConsultantAcademicTitle(e.target.value)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="d-flex align-items-center">Должность</Form.Label>
                    <Col sm={8}>
                      <Form.Control type="text" className={styles_base.form_control} placeholder="должность" value={consultantJobTitle} onChange={(e) => setConsultantJobTitle(e.target.value)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="d-flex align-items-center">Место работы</Form.Label>
                    <Col sm={8}>
                      <Form.Control type="text" className={styles_base.form_control} placeholder="место работы" value={consultantPlaceOfWork} onChange={(e) => setConsultantPlaceOfWork(e.target.value)} />
                    </Col>
                  </Form.Group>
                </div>
              )}
            </div>
            <Button 
  className={styles.button_form} 
  onClick={() => generateDocument({ 
    generating_info, 
    action,
    formState: {
      fullname,
      phone,
      email,
      course,
      group,
      formOfEducation,
      basisOfStudy,
      theme,
      teacherFullname,
      teacherAcademicDegree,
      teacherAcademicTitle,
      teacherJobTitle,
      teacherPlaceOfWork,
      consultantFullname,
      consultantAcademicDegree,
      consultantAcademicTitle,
      consultantJobTitle,
      consultantPlaceOfWork
    }
  })}
>
  Отправить
</Button>

          </Form>
        </Col>
      </Row>
    </>
  );
}

export default GenerateApplicationForm;



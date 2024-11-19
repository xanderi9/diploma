import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Tooltip } from 'react-bootstrap';
import prev from '../../../img/prev.png'; 
import next from '../../../img/next.png';
import styles from '../FormsBase.module.css';

const MarksCompletionForm = ({studentData}) => {
 
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const [numberOfDebts, setNumberOfDebts] = useState(studentData.user[0].number_of_debts || 0);
  const [certificateDate, setCertificateDate] = useState(studentData.user[0].certificate_of_curriculum_completion || '');
  const [recordBookSubmitted, setRecordBookSubmitted] = useState(studentData.user[0].record_book_submitted || false);
  const [diplomaWithHonors, setDiplomaWithHonors] = useState(studentData.user[0].diploma_with_honors || false);
  const [publicationAgree, setPublicationAgree] = useState(studentData.request_without_student[0].publication_agree || '');
  const [teacherReview, setTeacherReview] = useState(studentData.request_without_student[0].teacher_review || 0);
  const [review, setReview] = useState(studentData.request_without_student[0].review || 0);
  const [implementationAct, setImplementationAct] = useState(studentData.request_without_student[0].implementation_act || 'нет');
  const [plagarismReport, setPlagarismReport] = useState(studentData.request_without_student[0].plagiarism_report || 0);
  const [applicationForVacation, setApplicationForVacation] = useState(studentData.user[0].application_for_postgraduate_leave || 'нет');
  const [recommendedForAdmission, setRecommendedForAdmission] = useState(studentData.user[0].recommended_for_admission || 'нет');
  const [typeOfFqw, setTypeOfFqw] = useState(studentData.request_without_student[0].type_of_fqw || 'академическое');
  const [additionalInformation, setAdditionalInformation] = useState(studentData.request_without_student[0].additional_information || '');
  const [fqwByApplication, setFqwByApplication] = useState(studentData.request_without_student[0].theme.fqw_by_application || 'предприятия');
  const [fqwInEnglish, setFqwInEnglish] = useState(studentData.request_without_student[0].fqw_in_english || 'нет');
  const [fqwRecommended, setFqwRecommended] = useState(studentData.request_without_student[0].fqw_recommended || 'к внедрению');
  const [specialConditions, setSpecialConditions] = useState(studentData.request_without_student[0].special_conditions || 'не требуется');

  const handleTypeOfFqwChange = (event) => {
    setTypeOfFqw(event.target.value);
  };

  const handleAdditionalInformationChange = (event) => {
    setAdditionalInformation(event.target.value);
  };

  const handleFqwByApplicationChange = (event) => {
    setFqwByApplication(event.target.value);
  };

  const handleFqwInEnglishChange = (event) => {
    setFqwInEnglish(event.target.value);
  };

  const handleFqwRecommendedChange = (event) => {
    setFqwRecommended(event.target.value);
  };

  const handleSpecialConditionsChange = (event) => {
    setSpecialConditions(event.target.value);
  };
  const handleImplementationActChange = (event) => {
    setImplementationAct(event.target.value);
  };

  const handlePlagarismReportChange = (event) => {
    setPlagarismReport(event.target.value);
  };

  const handleApplicationForVacationChange = (event) => {
    setApplicationForVacation(event.target.value);
  };

  const handleRecommendedForAdmissionChange = (event) => {
    setRecommendedForAdmission(event.target.value);
  };
  const handleTeacherReviewChange = (event) => {
    setTeacherReview(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  const handleRecordBookChange = (event) => {
    setRecordBookSubmitted(event.target.value);
};
const handleDiplomaChange = (event) => {
    setDiplomaWithHonors(event.target.value);
};
const handlePublicationAgreeChange = (event) => {
  setPublicationAgree(event.target.value);
};

  const handleNumberOfDebtsChange = (event) => {
    setNumberOfDebts(event.target.value);
  };
  const handleCertificateDateChange = (event) => {
    setCertificateDate(event.target.value);
  };
  return (

      <Row >
        <Col md={8} className='px-5'>
          <h4 className="mb-4 text-center">Форма</h4>
          {currentStep === 0 && (
            <div className={`step ${currentStep === 0 ? 'active' : ''}`}>
             <Form.Group as={Row}>
              <Form.Label column sm={5} className="d-flex align-items-center">
                Долги
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  className={styles.form_control}
                  type="number"
                  value={numberOfDebts}
                  placeholder="количество долгов"
                  onChange={handleNumberOfDebtsChange}
                />
              </Col>
            </Form.Group>

              <Form.Group as={Row} data-toggle="tooltip" title="Если справка сдана, укажите дату. Если не сдана, оставьте поле пустым">
                <Form.Label column sm={5} className="d-flex align-items-center">Справка о выполнении уч.плана</Form.Label>
                <Col sm={7}>
                  <Form.Control className={styles.form_control} type="date" value={certificateDate} placeholder="дата справки"  onChange={handleCertificateDateChange}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
  <Form.Label column sm={5} className="d-flex align-items-center">Сдана зачетка</Form.Label>
  <Col sm={5} className="d-flex align-items-center">
    <Form.Check
      inline
      type="radio"
      name="recordBook"
      id="gradebook-yes"
      label="да"
      value="да"
      defaultChecked={recordBookSubmitted === true}
      onChange={handleRecordBookChange}
    />
    <Form.Check
      inline
      type="radio"
      name="recordBook"
      id="gradebook-no"
      label="нет"
      value="нет"
      defaultChecked={recordBookSubmitted === false}
      onChange={handleRecordBookChange}
    />
  </Col>
</Form.Group>

<Form.Group as={Row}>
  <Form.Label column sm={5} className="d-flex align-items-center">Красный диплом</Form.Label>
  <Col sm={7} className="d-flex align-items-center">
    <Form.Check
      inline
      type="radio"
      name="diploma"
      id="prestigious_diploma-yes"
      label="да"
      value="да"
      defaultChecked={diplomaWithHonors === true}
      onChange={setDiplomaWithHonors}
    />
    <Form.Check
      inline
      type="radio"
      name="diploma"
      id="prestigious_diploma-no"
      label="нет"
      value="нет"
      defaultChecked={diplomaWithHonors === false}
      onChange={setDiplomaWithHonors}
    />
  </Col>
</Form.Group>



<Form.Group as={Row}>
      <Form.Label column sm={5} className="d-flex align-items-center">Согласие на публикацию</Form.Label>
      <Col sm={7} className="d-flex align-items-center">
        <Form.Check
          inline
          type="radio"
          name="consentToPublication"
          id="consent_to_publication-yes"
          label="да"
          value="да"
          checked={publicationAgree === true}
          onChange={handlePublicationAgreeChange}
        />
        <Form.Check
          inline
          type="radio"
          name="consentToPublication"
          id="consent_to_publication-no"
          label="нет"
          value="нет"
          checked={publicationAgree === false}
          onChange={handlePublicationAgreeChange}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row}>
        <Form.Label column sm={5} className="d-flex align-items-center">Отзыв</Form.Label>
        <Col sm={7}>
          <Form.Control
            as="select"
            id="review_mark"
            className={styles.form_control}
            value={teacherReview}
            onChange={handleTeacherReviewChange}
          >
            <option value="0">-</option>
            <option value="2">неудовлетворительно</option>
            <option value="3">удовлетворительно</option>
            <option value="4">хорошо</option>
            <option value="5">отлично</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5} className="d-flex align-items-center">Рецензия</Form.Label>
        <Col sm={7}>
          <Form.Control
            as="select"
            id="critique"
            className={styles.form_control}
            value={review}
            onChange={handleReviewChange}
          >
            <option value="0">-</option>
            <option value="2">неудовлетворительно</option>
            <option value="3">удовлетворительно</option>
            <option value="4">хорошо</option>
            <option value="5">отлично</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5} className="d-flex align-items-center">Акт о внедрении</Form.Label>
        <Col sm={7} className="d-flex align-items-center">
          <Form.Check
            inline
            type="radio"
            name="act_of_implementation"
            id="act_of_implementation-yes"
            label="есть"
            value="есть"
            checked={implementationAct === 'есть'}
            onChange={handleImplementationActChange}
          />
          <Form.Check
            inline
            type="radio"
            name="act_of_implementation"
            id="act_of_implementation-no"
            label="нет"
            value="нет"
            checked={implementationAct === 'нет'}
            onChange={handleImplementationActChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5} className="d-flex align-items-center">Отчет о плагиате</Form.Label>
        <Col sm={7}>
          <Form.Control
            type="number"
            min="0"
            max="100"
            id="input9"
            placeholder="% оригинальности"
            className={styles.form_control}
            value={plagarismReport}
            onChange={handlePlagarismReportChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5} className="d-flex align-items-center">Заявление на последипломный отпуск</Form.Label>
        <Col sm={7} className="d-flex align-items-center">
          <Form.Check
            inline
            type="radio"
            name="application_for_vacation"
            id="application_for_vacation-yes"
            label="есть"
            value="есть"
            checked={applicationForVacation === true}
            onChange={handleApplicationForVacationChange}
          />
          <Form.Check
            inline
            type="radio"
            name="application_for_vacation"
            id="application_for_vacation-no"
            label="нет"
            value="нет"
            checked={applicationForVacation ===false}
            onChange={handleApplicationForVacationChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5} className="d-flex align-items-center">Рекомендован к поступлению:</Form.Label>
        <Col sm={7}>
          <Form.Control
            as="select"
            id="dropdown"
            className={styles.form_control}
            value={recommendedForAdmission}
            onChange={handleRecommendedForAdmissionChange}
          >
            <option value="нет">Нет</option>
            <option value="в магистратуру">В магистратуру</option>
            <option value="в аспирантуру">В аспирантуру</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Row className='justify-content-center align-items-center'>
  <Col md={6} className='text-center'>
  
  <Button variant="none" className={styles.next} onClick={nextStep}>
                <img src={next} width="50px" alt="Следующий" />
              </Button>
  </Col>
  </Row>
             
            </div>
          )}
          {currentStep === 1 && (
            <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
          <Form.Group as={Row}>
        <Form.Label column sm={5}>Вид ВКР</Form.Label>
        <Col sm={7}>
          <Form.Control
            as="select"
            id="type_vkr"
            className={styles.form_control}
            value={typeOfFqw}
            onChange={handleTypeOfFqwChange}
          >
            <option value="академическое">академическое</option>
            <option value="проектно-исследовательское">проектно-исследовательское</option>
            <option value="комплексное">комплексное</option>
            <option value="в формате стартапа">в формате стартапа</option>
            <option value="в формате стартапа с актом внедрения">в формате стартапа с актом внедрения</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} data-toggle="tooltip" title="Если у Вас комплексная ВКР, укажите общую тему, в иных случаях укажите дополнительную информацию при необходимости либо оставьте поле пустым">
        <Form.Label column sm={5}>Дополнительно</Form.Label>
        <Col sm={7}>
          <Form.Control
            type="text"
            id="additional"
            placeholder="дополнительно"
            className={styles.form_control}
            value={additionalInformation}
            onChange={handleAdditionalInformationChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5}>ВКР по заявке</Form.Label>
        <Col sm={7}>
          <Form.Control
            as="select"
            id="on_request"
            className={styles.form_control}
            value={fqwByApplication}
            onChange={handleFqwByApplicationChange}
          >
            <option value="предприятия">предприятия</option>
            <option value="подразделения СФУ">подразделения СФУ</option>
            <option value="предложено студентом">предложено студентом</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5}>ВКР на английском языке</Form.Label>
        <Col sm={7} className="d-flex align-items-center">
          <Form.Check
            inline
            type="radio"
            name="english"
            id="english-yes"
            label="да"
            value="да"
            checked={fqwInEnglish === 'да'}
            onChange={handleFqwInEnglishChange}
          />
          <Form.Check
            inline
            type="radio"
            name="english"
            id="english-no"
            label="нет"
            value="нет"
            checked={fqwInEnglish === 'нет'}
            onChange={handleFqwInEnglishChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5}>ВКР рекомендовано</Form.Label>
        <Col sm={7}>
          <Form.Control
            as="select"
            id="is_recommended"
            className={styles.form_control}
            value={fqwRecommended}
            onChange={handleFqwRecommendedChange}
          >
            <option value="к внедрению">к внедрению</option>
            <option value="имеется внедрение">имеется внедрение</option>
            <option value="к опубликованию">к опубликованию</option>
            <option value="имеется публикация">имеется публикация</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={5}>Наличие специальных условий</Form.Label>
        <Col sm={7} className="d-flex align-items-center">
          <Form.Check
            inline
            type="radio"
            name="special_conditions"
            id="special_conditions-yes"
            label="требуется"
            value="требуется"
            checked={specialConditions === 'требуется'}
            onChange={handleSpecialConditionsChange}
          />
          <Form.Check
            inline
            type="radio"
            name="special_conditions"
            id="special_conditions-no"
            label="не требуется"
            value="не требуется"
            checked={specialConditions === 'не требуется'}
            onChange={handleSpecialConditionsChange}
          />
        </Col>
      </Form.Group>
      <Row className='justify-content-center align-items-center'>
  <Col md={6} className='text-center'>
    <Button variant="none" className={styles.prev} onClick={prevStep}>
      <img src={prev} width="50px" alt="Предыдущий" />
    </Button>
  </Col>
  <Col md={6} className='text-center'>
    <Button type="submit" variant="dark" className={styles.button_form24}>Отправить</Button>
  </Col>
</Row>


            </div>
          )}
        </Col>
        <div className={styles.vertical_line} ></div>
        <Col md={3} className="mx-3">
              <h4 className="mb-4 text-center">Правила заполнения формы</h4>
              <p>
                Данная форма доступна для подачи данных о выполнении отметок образовательного процесса вплоть до того
                момента, как будет проверена секретарем ГЭК. Далее выпускник не сможет изменить данные об отметках.
                Заполняйте данную форму внимательно. Если сомневаетесь в правильности заполнения полей, оставьте их пустыми.
              </p>
        </Col>
      </Row>
  
  );
};

export default MarksCompletionForm;

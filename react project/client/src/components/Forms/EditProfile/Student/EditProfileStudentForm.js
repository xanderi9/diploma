import React, { useState } from 'react';
import { Button, Container, Row, Form, Col, Image } from 'react-bootstrap';
import prev from '../../../../img/prev.png'; 
import next from '../../../../img/next.png';
import styles_base from '../../../Forms/FormsBase.module.css';
import styles from './EditProfileStudentForm.module.css';

function EditProfileStudentForm({ studentData }) {
  const [step, setStep] = useState(1);
  const user_0 = studentData.user[0].user
  const group = studentData.user[0].group
  const [formData, setFormData] = useState({
    last_name: user_0.last_name,
    first_name: user_0.first_name,
    patronymic: user_0.patronymic,
    course_number: group.course_number,
    group_name: group.name,
    date_of_birth: studentData.user[0].date_of_birth,
    phone: user_0.phone,
    email: user_0.email,
    access_contacts_agree: studentData.user[0].access_contacts_agree,
    record_book_number: studentData.user[0].record_book_number,
    average_score: studentData.user[0].average_score,
    form_of_education: studentData.user[0].form_of_education,
    basis_of_study: studentData.user[0].basis_of_study,
    year_of_prev_education_completion: studentData.user[0].year_of_prev_education_completion,
    form_of_prev_education: studentData.user[0].form_of_prev_education,
    year_of_admission: studentData.user[0].year_of_admission,
    special_marks: studentData.user[0].special_marks
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch or Axios to send form data to the server
    fetch('/api/updateStudentProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };

  return (
   <>
        <form className="px-md-4 mx-md-2 my-md-1 px-2" onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="step active" id="step1">
              <h5 className="text-center py-2">Основная информация</h5>
              <div className={styles_base.block_form } >
                <Form.Group as={Row} controlId="input1" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Фамилия</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Фамилия" name="last_name" value={formData.last_name} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input1" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Имя</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Имя" name="first_name" value={formData.first_name} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input1" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Отчество</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Отчество" name="patronymic" value={formData.patronymic} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input2" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Курс</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Курс" name="course_number" value={formData.course_number} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input3" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Группа</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Группа" name="group_name" value={formData.group_name} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input4" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Дата рождения</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Дата рождения" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                  </Col>
                </Form.Group>
              </div>
              <h5 className="text-center py-2">Контактная информация</h5>
              <div className={styles_base.block_form}>
                <Form.Group as={Row} controlId="input5" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Номер телефона</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Номер телефона" name="phone" value={formData.phone} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input6" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Email</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="access_contacts_agree" className="justify-content-center">
                  <Form.Label column sm={4} className="d-flex align-items-center">Публичный профиль</Form.Label>
                  <Col sm={6}>
                    <Form.Check
                      type="checkbox"
                      className={styles_base.checkbox_style}
                      name="access_contacts_agree"
                      checked={formData.access_contacts_agree}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </div>
              <Row className="justify-content-center text-center pt-3">
                <Col>
                  <Button variant="link" className={styles_base.next} onClick={nextStep}>
                    <Image src={next} className={styles.next_and_prev} width="50px" alt="Следующий" />
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {step === 2 && (
            <div className="step active" id="step2">
              <h5 className="text-center py-2">Успеваемость</h5>
              <div className={styles_base.block_form}>
                <Form.Group as={Row} controlId="input7" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Номер зачетки</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="номер зачетки" name="record_book_number" value={formData.record_book_number} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input8" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Средний балл</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="средний балл" name="average_score" value={formData.average_score} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="dropdown1" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Форма обучения</Form.Label>
                  <Col sm={7}>
                    <Form.Control as="select" className={styles_base.form_control} name="form_of_education" value={formData.form_of_education} onChange={handleChange}>
                      <option value="Очная">Очная</option>
                      <option value="Заочная">Заочная</option>
                      <option value="Очно-заочная">Очно-заочная</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="dropdown2" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Основа обучения</Form.Label>
                  <Col sm={7}>
                    <Form.Control as="select" className={styles_base.form_control} name="basis_of_study" value={formData.basis_of_study} onChange={handleChange}>
                      <option value="за счет бюджетных ассигнований федерального бюджета">за счет бюджетных ассигнований федерального бюджета</option>
                      <option value="на условиях договора об оказании платных образовательных услуг">на условиях договора об оказании платных образовательных услуг</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </div>
              <Row className="justify-content-center text-center pt-3">
                <Col>
                  <Button variant="link" className={styles_base.prev} onClick={prevStep}>
                    <Image src={prev} className={styles.next_and_prev} width="50px" alt="Предыдущий" />
                  </Button>
                </Col>
                <Col>
                  <Button variant="link" className={styles_base.next} onClick={nextStep}>
                    <Image src={next} className={styles.next_and_prev} width="50px" alt="Следующий" />
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="step active" id="step3">
              <h5 className="text-center py-2">Данные о предыдущем образовании</h5>
              <div className={styles_base.block_form}>
                <Form.Group as={Row} controlId="input10" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Год окончания предыдущего образования:</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Год" name="year_of_prev_education_completion" value={formData.year_of_prev_education_completion} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="dropdown3" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Форма предыдущего образования</Form.Label>
                  <Col sm={7}>
                    <Form.Control as="select" className={styles_base.form_control} name="form_of_prev_education" value={formData.form_of_prev_education} onChange={handleChange}>
                      <option value="Диплом бакалавра">Диплом бакалавра</option>
                      <option value="Диплом специалиста">Диплом специалиста</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="input11" className="justify-content-center">
                  <Form.Label column sm={3} className="d-flex align-items-center">Год поступления:</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" className={styles_base.form_control} placeholder="Год" name="year_of_admission" value={formData.year_of_admission} onChange={handleChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="textarea" className="justify-content-center" data-toggle="tooltip" title="Участие в конференции, участие в соц.сфере, наличие акта внедрения, наличие публикации и др.">
                  <Form.Label column sm={3} className="d-flex align-items-center">Особые отметки:</Form.Label>
                  <Col sm={7}>
                    <Form.Control as="textarea" className={styles_base.form_control} rows={3} placeholder="Отметки" name="special_marks" value={formData.special_marks} onChange={handleChange} />
                  </Col>
                </Form.Group>
              </div>
              <Row className="justify-content-between pt-3 text-center">
                <Col>
                  <Button variant="link" className={styles_base.prev} onClick={prevStep}>
                    <Image src={prev} className={styles.next_and_prev} width="50px" alt="Предыдущий" />
                  </Button>
                </Col>
                <Col>
                  <Button type="submit" className={styles.button_form}>Отправить</Button>
                </Col>
              </Row>
            </div>
          )}
        </form>
    </>
  );
}

export default EditProfileStudentForm;

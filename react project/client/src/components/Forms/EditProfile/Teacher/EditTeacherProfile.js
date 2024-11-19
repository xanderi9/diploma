import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import BlockInfo from '../../../BlockInfo/BlockInfo';
import styles_base from '../../../Forms/FormsBase.module.css'



function EditTeacherProfile({teacherData, darkMode}) {
    const user = teacherData.user[0].user
    const user_0=teacherData.user[0]
    const ei = teacherData.employee_information[0]
    return (
        <>
                <h4 className="mb-4 text-center">Редактирование профиля</h4>

           <BlockInfo darkMode={darkMode}>
           Будьте внимательны при редактировании профиля, Ваши данные будут использоваться при формировании документов в системе.
           </BlockInfo>
                         
                <Form className="px-md-4 py-2 m-md-2">
                    <div className={styles_base.block_form}>
                        <h5 className="text-center pb-2">Основная информация</h5>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Фамилия</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="Фамилия" defaultValue={user.last_name}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Имя</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="Имя" defaultValue={user.first_name}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Отчество</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="Отчество" defaultValue={user.patronymic}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Количество вакантных мест</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="number" min={0} max={10} className={styles_base.form_control} placeholder="количество мест" defaultValue={user_0.number_of_vacancies}  />
                            </Col>
                        </Form.Group>
                        </div>
                        <div className={styles_base.block_form}>
                        <h5 className="text-center pb-2">Контактная информация</h5>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Номер телефона</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="номер телефона" defaultValue={user.phone}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="email" defaultValue={user.email}/>
                            </Col>
                        </Form.Group>
                        </div>

                        <div className={styles_base.block_form}>
                        <h5 className="text-center pb-2">Информация о сотруднике</h5>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Должность</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="должность" defaultValue={ei.job_title}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Ученая степень</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="ученая степень" defaultValue={ei.academic_degree}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Ученое звание</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="ученое звание" defaultValue={ei.academic_title}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="input1" className="justify-content-center">
                            <Form.Label column sm={3}>Место работы</Form.Label>
                            <Col sm={7}>
                            <Form.Control type="text" className={styles_base.form_control} placeholder="место работы" defaultValue={ei.place_of_work} />
                            </Col>
                        </Form.Group>
                        </div>
           
                    <Button type="submit" className={`${styles_base.button_submit_editing_profile} mt-3`}>Отправить</Button>
         
                </Form>
</>
    );
}

export default EditTeacherProfile;

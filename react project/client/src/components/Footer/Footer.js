import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ikit from '../../img/ikit.png';
import ikit_dark from '../../img/ikit_dark.png';
import styles from './Footer.module.css';
import AboutSystemModal from '../Footer/FooterModals/AboutSystemModal/AboutSystemModal'
import SecurityPoliticsModal from '../Footer/FooterModals/SecurityPoliticsModal/SecurityPoliticsModal'
import SystemInstructionsModal from './FooterModals/SystemInstructionsModal/SystemInstructionsModal';
import {Link} from 'react-router-dom'



const Footer = ({ darkMode }) => {
  const [showModal, setShowModal] = useState({
    aboutSystem: false,
    securityPolitics: false,
    systemInstructions: false
  });
  const ikitPath = darkMode ? ikit_dark : ikit;
  const handleClose = (modal) => setShowModal({ ...showModal, [modal]: false });
  const handleShow = (modal) => setShowModal({ ...showModal, [modal]: true });


  return (
    
<footer className={`p-md-5  darkMode ? ${styles.footer} ${styles['dark_mode']} : styles.footer`}>
      <Row className="ml-4">
        <Col md={4} xs={12} className="text-center mb-3 mb-md-0">
          <Link variant='none' to="https://ikit.sfu-kras.ru/">
            <img src={ikitPath} className="ikit" width="70%" alt="Light Icon" loading="lazy" />
          </Link>
        </Col>
        <Col md={8} xs={12}>
          <Row>
            <Col md={6} xs={12} className="text-left">
              <Link variant='none' to="#"  onClick={() => handleShow('securityPolitics')}>Политика конфиденциальности</Link>
            </Col>
            <Col md={6} xs={12} className="text-left">
              <Link variant='none' to="https://about.sfu-kras.ru/node/10201">Соглашение о персональных данных</Link>
            </Col>
          </Row>
          <Row className="mt-md-2">
            <Col md={6} xs={12} className="text-left">
              <Link variant='none' to="#" onClick={() => handleShow('systemInstructions')}>Инструкции по работе в системе</Link>
            </Col>
            <Col md={6} xs={12} className="text-left">
              <Link variant='none' to="#" onClick={() => handleShow('aboutSystem')}>О системе</Link>
            </Col>
          </Row>
        </Col>
      </Row>

    <AboutSystemModal show={showModal.aboutSystem} handleClose={() => handleClose('aboutSystem')} />
    <SecurityPoliticsModal show={showModal.securityPolitics} handleClose={() => handleClose('securityPolitics')} /> 
    <SystemInstructionsModal show={showModal.systemInstructions} handleClose={() => handleClose('systemInstructions')} /> 
    </footer>
  );
};

export default Footer;

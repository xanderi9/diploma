import React, { Component } from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import light from './light.png'
import logout from './logout.png'
import menu from './menu.png'
import styles from './header.module.css';
import SideMenu from '../SideMenu/SideMenu'

const AuthenticatedMenu = ({ toggleMenu, toggleTheme, darkMode, data, isSideMenuOpen  }) => {

  const menuGradientClass = `${styles.menu_gradient} navbar-transparent p-0 ${darkMode ? styles.dark_mode : ''}`;
  const type_of_user = localStorage.getItem('type_of_user');
  const fullname = localStorage.getItem('last_name') + ' ' + localStorage.getItem('first_name') + ' ' + localStorage.getItem('patronymic')

  console.log(type_of_user)

  const getProfilePath = (type_of_user) => {
    let profilePath;
    switch (type_of_user) {
      case 'Выпускник':
        profilePath = '/profile_student';
        break;
      case 'Руководитель':
        profilePath = '/profile_teacher';
        break;
      case 'Секретарь ГЭК':
        profilePath = '/profile_secretary';
        break;
      default:
        profilePath = '/';
    }
    return profilePath;
  };

  const profilePath = getProfilePath(type_of_user);


  return (
    <>
      <Navbar expand="lg" className={`${menuGradientClass} navbar-transparent p-0`}>
        <Container>
          <Nav className='w-100 d-flex justify-content-between align-items-center'>

            <Nav.Item>
              <Nav.Link href="#">
              <Button variant='none' onClick={toggleMenu}>
                  <img src={menu} width="25" height="25" alt="Menu Icon" loading="lazy" />
                </Button>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href={profilePath}>
                <p> {fullname}</p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="#">
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>еДиплом</p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="#">
                <img src={light} onClick={toggleTheme} width="25" height="25" alt="Icon" loading="lazy" />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/">
                <img src={logout} width="25" height="25" alt="Icon" loading="lazy" />
              </Nav.Link>
            </Nav.Item>

          </Nav>
        </Container>
      </Navbar>

      <SideMenu toggleMenu={toggleMenu} isSideMenuOpen={isSideMenuOpen} darkMode={darkMode} data={data} />

    </>
  );
};

// Компонент для неавторизованных пользователей
const UnauthenticatedMenu = ({toggleTheme, darkMode }) => {
  const menuGradientClass = `${styles.menu_gradient} navbar-transparent p-0 ${darkMode ? styles.dark_mode : ''}`;
  return (
    <>
      <Navbar expand="lg" className={`${menuGradientClass} navbar-transparent p-0`}>
          <Container>
            <Nav className='w-100 d-flex justify-content-between align-items-center'>
              <Nav.Item>
                <Nav.Link href="#">
                  <p>Нужна помощь?</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">
                  <p style={{ fontWeight: 'bold', fontSize: '20px' }}>еДиплом</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">
                  <img src={light} onClick={toggleTheme} width="25" height="25" alt="Icon" loading="lazy" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
            </>
  );
};

const Header = ({ isAuthenticated, toggleMenu, isSideMenuOpen, toggleTheme, data, darkMode }) => {
  console.log("Меню открыто:", isSideMenuOpen);

  return (
    <div>
      {isAuthenticated ? <AuthenticatedMenu toggleMenu={toggleMenu} toggleTheme={toggleTheme} data={data} isSideMenuOpen={isSideMenuOpen} darkMode={darkMode}/> : <UnauthenticatedMenu toggleMenu={toggleMenu} toggleTheme={toggleTheme}  darkMode={darkMode}/>}
    </div>
  );
};
export default Header;
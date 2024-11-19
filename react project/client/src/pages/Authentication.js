import React, { Component } from 'react'
import AuthentificationForm from '../components/AuthentificationForm/AuthentificationForm.js';
import BasePage from '../pages/BasePages/BasePage.js';

export default class Authentication extends Component {

  componentDidMount() {
    document.title = "Авторизация";
  }

  render() {
    
    return (
        <>
        <BasePage isAuthenticated={false}>
        <AuthentificationForm/>
        </BasePage>
        </>
    )
  }
}

import React, { Component } from 'react'
import styles from './CustomContainer.module.css'
export default class CustomContainer extends Component {
  render() {
    const { children} = this.props;
    return (
    <div classname={styles.custom_container}>
        {children}
    </div>
    )
  }
}

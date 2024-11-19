import React, { Component } from 'react';
import styles from './Card.module.css';

export default class Card extends Component {
  render() {
    const { children, darkMode } = this.props;

    // Добавляем darkMode в children
    const childrenWithProps = React.Children.map(children, child => {
      // Проверяем, что child не null и не undefined
      if (React.isValidElement(child)) {
        // Клонируем элемент с передачей дополнительного пропа darkMode
        return React.cloneElement(child, { darkMode: darkMode });
      }
      return child;
    });

    return (
      <div className={darkMode ? `${styles.card} ${styles['dark_mode']}` : styles.card}>
        {childrenWithProps}
      </div>
    );
  }
}

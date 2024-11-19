import React, { useState } from 'react';
import styles from './Background.module.css';

const Background = ({ children, darkMode, toggleTheme }) => {
  return (
    <div className={darkMode ? `${styles.body} ${styles['dark_mode']}` : styles.body}>
      {children}

    </div>
  );
};

export default Background;

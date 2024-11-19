import React, { Component } from 'react'
import info from "./info.png"
import styles from "./BlockInfo.module.css"

export default class BlockInfo extends Component { 
  render() {
    const { children, darkMode } = this.props;
    return (
      <div className={darkMode ? `my-3 ${styles.block_info} ${styles['dark_mode']}` : `my-3 ${styles.block_info}`}>
        <div class="row justify-content-center ">
            <div class="col-md-1 d-flex align-items-center">
              <img src={info} class="info-icon" width="25" height="25" alt="Icon" loading="lazy"/>
            </div>
            <div class="col-md-11">
            {this.props.children}

    </div>
    </div>
    </div>
    )
  }
}

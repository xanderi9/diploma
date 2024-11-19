import React, { Component } from 'react'
import styles from '../ProfileBlocks.module.css';
import {Link} from 'react-router-dom'
import {Row} from 'react-bootstrap'

export default class MethodRecommendationsCard extends Component {
  render() {
    return (
        <div class={`${styles.card_4} mb-5`}>
        
        <Link to='/method_recommendations'>
         <p class="text-center p-1 mt-3 fw-bold"> Методические рекомендации по оформлению пояснительной записки </p>
        </Link>

     </div>
    )
  }
}

import React, { Component } from 'react'
import MethodRecommendationsCard from '../../components/MethodRecommendationsCard/MethodRecommendationsCard.js';
import BasePageWithCard from '../BasePages/BasePageWithCard.js';

export default class MethodRecommendations extends Component {
  
  componentDidMount() {
    document.title = "Методические рекомендации";
  }
  render() {

    return (
      
        <BasePageWithCard isAuthenticated={true} >
            <MethodRecommendationsCard/>
        </BasePageWithCard>
    )
  }
}

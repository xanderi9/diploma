import React from 'react'
import BasePageWithCard from '../BasePages/BasePageWithCard';
import PublishOrdersForm from '../../components/Orders/PublishOrdersForm/PublishOrdersForm'

function PublishOrders() {
  return (
    <BasePageWithCard isAuthenticated={true} >
     <PublishOrdersForm/>
    </BasePageWithCard>
  )
}

export default PublishOrders
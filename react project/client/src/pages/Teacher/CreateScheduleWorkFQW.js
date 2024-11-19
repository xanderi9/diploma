import React from 'react'
import BasePageWithCard from '../BasePages/BasePageHugeCard';
import CreateScheduleWorkFQWForm from '../../components/Forms/CreateScheduleWorkFQWForm/CreateScheduleWorkFQWForm'

function CreateScheduleWorkFQW({}) {
  return (
    <BasePageWithCard isAuthenticated={true} >
<CreateScheduleWorkFQWForm  />
          </BasePageWithCard>
  )
}

export default CreateScheduleWorkFQW
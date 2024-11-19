import React from 'react'
import BasePageWithCard from '../BasePages/BasePageWithCard'
import ChooseNewTheme from '../../components/Forms/ChooseNewTheme/ChooseNewTheme'

function ChooseTheme({data, themes_list}) {
  return (
   <BasePageWithCard isAuthenticated={true} data={data}>
   <ChooseNewTheme themes_list={themes_list}/>
   </BasePageWithCard>
  )
}

export default ChooseTheme
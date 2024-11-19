import React, { Component } from 'react'
import download from '../../../img/download.png'
import applicationBachelor from '../../../documents/ApplicationForGraduateWork/ApplicationForGraduateWork.pdf'
import applicationMaster from '../../../documents/ApplicationForGraduateWorkMaster/ApplicationForGraduateWorkMaster.pdf'
import applicationChange from '../../../documents/ApplicationForChangingTheme/ApplicationForChangingTheme.pdf'
import titlePage from '../../../documents/TitlePage/TitlePage.pdf'
import agreementPublication from '../../../documents/AgreementForPublication/AgreementForPublication.pdf'
import applicationVacation from '../../../documents/ApplicationForPostgraduateVacation/ApplicationForPostgraduateVacation.pdf'
import studentsInfo from '../../../documents/ApplicationForPostgraduateVacation/ApplicationForPostgraduateVacation.pdf'
import applicationComplex from '../../../documents/ApplicationComplexWork/ApplicationComplexWork.pdf'
import titlePageComplex from '../../../documents/TitleTaskComplex/TitleTaskComplex.pdf'

export default class StudentDocuments extends Component {
  render() {
   
    return (
      <>
      <table width={'100%'}>
  <tr>
  <td>
  <a href={applicationBachelor} download="Заявление на утверждение темы ВКР.pdf">Заявление на утверждение темы ВКР (бакалавриат, специалитет)</a>   </td>
      <td>
      <a href={applicationBachelor} download="Заявление на утверждение темы ВКР.pdf">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
      </td>
  </tr>

  <tr>
  <td>
  <a href={applicationMaster} download="Заявление на утверждение темы ВКР.pdf">Заявление на утверждение темы ВКР (магистратура)</a>   </td>
      <td>
      <a href={applicationMaster} download="Заявление на утверждение темы ВКР.pdf">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
      </td>
  </tr>

   <tr>
  <td>
  <a href={applicationChange} download="Заявление на смену темы ВКР или руководителя.pdf">Заявление на смену темы ВКР</a>   
  </td>
      <td> <a href={applicationChange} download="Заявление на утверждение темы ВКР.pdf">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>

  <tr>
  <td>
  <a href={titlePage} download="Титульный лист пояснительной записки">Титульный лист пояснительной записки</a>   
  </td>
      <td> <a href={titlePage} download="Титульный лист пояснительной записки.pdf">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>


  <tr>
  <td>
  <a href={agreementPublication} download="Согласие на публикацию">Заявление о согласии  на размещение выпускной квалификационной работы в электронно-библиотечной
        среде ФГАОУ ВО СФУ</a>   
  </td>
      <td> <a href={agreementPublication} download="Согласие на публикацию.pdf">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>

  <tr>
  <td>
  <a href={applicationVacation} download="Заявление на последипломный отпуск">Заявление на последипломный отпуск</a>   
  </td>
      <td> <a href={applicationVacation} download="Заявление на последипломный отпуск">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>

  <tr>
  <td>
  <a href={studentsInfo} download="Информация о выпускниках">Информация о выпускниках (для старост)</a>   
  </td>
      <td> <a href={studentsInfo} download="Информация о выпускниках">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>

</table>

 <div class='complex_vkr'>
 <details>
    <summary>Комплексная ВКР</summary>
   <table width={'100%'}>

   <tr>
  <td>
  <a href={applicationComplex} download="Заявление на ВКР (комплексная ВКР)">Заявление на ВКР (комплексная ВКР)</a>   
  </td>
      <td> <a href={applicationComplex} download="Заявление на ВКР (комплексная ВКР)">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>

  <tr>
  <td>
  <a href={titlePageComplex} download="Форма титульного листа (комплексная ВКР">Форма титульного листа (комплексная ВКР)</a>   
  </td>
      <td> <a href={titlePageComplex} download="Форма титульного листа (комплексная ВКР">
<img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
</a>
</td>
  </tr>


</table>
                </details>
               </div>
      </>
    )
  }
}

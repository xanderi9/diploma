import React, { Component } from 'react'
import download from '../../../img/download.png'
import schedule from '../../../documents/Secretary/Schedule/Schedule.pdf'
import protocolProtectionFQW from '../../../documents/Secretary/ProtocolProtectionFQW/ProtocolProtectionFQW.pdf'
import qualificationAssignmentProtocol from '../../../documents/Secretary/QualificationAssignmentProtocol/QualificationAssignmentProtocol.pdf'
import protocolOfAppeal from '../../../documents/Secretary/ProtocolOfAppeal/ProtocolOfAppeal.pdf'
import chairmanReport from '../../../documents/Secretary/ChairmanReport/ChairmanReport.pdf'
import evaluationTable from '../../../documents/Secretary/EvaluationTable/EvaluationTable.pdf'




export default class SecretaryDocuments extends Component {
  render() {
   
    return (
      <>
      <table width={'100%'}>
<tr>
    <td>
        <a href={schedule} download="Форма расписания государственных итоговых испытаний.pdf">Форма расписания государственных итоговых испытаний</a>   
    </td>
    <td>
        <a href={schedule} download="Форма расписания государственных итоговых испытаний.pdf">
            <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </a>
    </td>
</tr>

<tr>
    <td>
        <a href={protocolProtectionFQW} download="Протокол заседания ГЭК по защите ВКР.pdf">Протокол заседания ГЭК по защите ВКР</a>   
    </td>
    <td>
        <a href={protocolProtectionFQW} download="Протокол заседания ГЭК по защите ВКР.pdf">
            <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </a>
    </td>
</tr>

<tr>
    <td>
        <a href={qualificationAssignmentProtocol} download="Протокол заседания ГЭК по присвоению квалификации.pdf">Протокол заседания ГЭК по присвоению квалификации</a>   
    </td>
    <td>
        <a href={qualificationAssignmentProtocol} download="Протокол заседания ГЭК по присвоению квалификации.pdf">
            <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </a>
    </td>
</tr>
   
<tr>
    <td>
        <a href={protocolOfAppeal} download="Протокол заседания апелляционной комиссии.pdf">Протокол заседания апелляционной комиссии</a>   
    </td>
    <td>
        <a href={protocolOfAppeal} download="Протокол заседания апелляционной комиссии.pdf">
            <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </a>
    </td>
</tr>

<tr>
    <td>
        <a href={chairmanReport} download="Отчет председателя ГЭК о работе ГЭК.pdf">Отчет председателя ГЭК о работе ГЭК</a>   
    </td>
    <td>
        <a href={chairmanReport} download="Отчет председателя ГЭК о работе ГЭК.pdf">
            <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </a>
    </td>
</tr>

<tr>
    <td>
        <a href={evaluationTable} download="Таблица оценивания.pdf">Таблица оценивания</a>   
    </td>
    <td>
        <a href={evaluationTable} download="Таблица оценивания.pdf">
            <img src={download} width="20" height="20" alt="profile_pic" loading="lazy" />
        </a>
    </td>
</tr>

</table>

      </>
    )
  }
}

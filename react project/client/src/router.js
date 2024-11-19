import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authentication from './pages/Authentication';
import ProfileStudent from './pages/Student/ProfileStudent'
import EditStudentPage from './pages/Student/EditStudentPage';
import ChooseTeacher from "./pages/Student/ChooseTeacher";
import CreateRequest from "./pages/Student/CreateRequest";
import GenerateApplicaton from "./pages/Student/GenerateApplicaton";
import MethodRecommendations from "./pages/Student/MethodRecommendations";
import FormMarksCompletion from "./pages/Student/FormMarksCompletion";
import ProfileTeacher from "./pages/Teacher/ProfileTeacher";
import EditTeacherPage from "./pages/Teacher/EditTeacherPage";
import EditThemeListTeacher from "./pages/Teacher/EditThemeListTeacher";
import EditThemeListSecretary from "./pages/Secretary/EditThemesListSecretary";
import EditSecretaryProfile from "./pages/Secretary/EditSecretaryProfile";
import ProfileSecretary from "./pages/Secretary/ProfileSecretary";
import SecretaryTableData from "./pages/Secretary/SecretaryTableData";
import SupervisedStudents from "./pages/Teacher/SupervisedGraduates";
import PublishOrders from "./pages/Secretary/PublishOrders";
import CreateSheduleProtection from "./pages/Secretary/CreateSheduleProtection";
import CreateScheduleWorkFQW from "./pages/Teacher/CreateScheduleWorkFQW";
import ViewProtectionSchedule from "./pages/ViewProtectionSchedule/ViewProtectionSchedule";
import ViewProtectionSchedulePersonsPage from './pages/ViewProtectionSchedule/ViewProtectionSchedulePersonsPage'
import ViewThemesListPage from "./pages/ViewThemesList/ViewThemesListPage";
import GenerateProtocolsPage from "./pages/Secretary/GenerateProtocolsPage";
import ViewCreatedRequest from "./pages/Student/ViewCreatedRequest";
import ChooseTheme from './pages/Student/ChooseTheme'

const studentData = {
  user:{
    id: 45,
    username: 'MEdunova-KI20',
    password: '111',
    last_name: 'Едунова',
    first_name: 'Мария',
    patronymic: 'Алексеевна',
    type_of_user: 'Выпускник',
    email: 'masha.edunova@gmail.com',
    phone: '89131874664'
  },
  record_book_number: '032050313',
  access_contacts_agree: true,
  group: {
    id: 2,
    course_number: 4,
    speciality: {
      id: 1,
      name: 'Информационные системы и технологии',
      code: '09.03.02',
      field_of_study: {
        id: 1,
        code: '09.03.02.30',
        name: 'Информационные системы и технологии'
      }
    },
    name: 'КИ20-12Б'
  },
  average_score: '4.97',
  notification_order: true,
  notification_schedule: true,
  notification_protection: true,
  basis_of_study: 'за счет бюджетных ассигнований федерального бюджета',
  date_of_birth: '29.10.2002',
  year_of_prev_education_completion: 2020,
  form_of_prev_education: 'аттестат о среднем общем образовании',
  year_of_admission: 2020,
  special_marks: 'ее пиздец как бесит автоматизация гиа',
  number_of_debts: '',
  certificate_of_curriculum_completion: '',
  record_book_submitted: false, 
  diploma_with_honors: false,
  application_for_postgraduate_leave: '',
  recommended_for_admission: '', 
  group_leader: false,
  level_of_education: 'магистратура',
  form_of_education: 'очная',
  number_of_requests: '0',
};

const teacherData = {
  user: {
    id:1,
    last_name: 'Раевич',
    first_name: 'Ксения',
    patronymic: 'Владиславовна',
    type_of_user: 'Руководитель',
    phone: '89029479572',
    email: 'Kshatrova@sfu-kras.ru',
  },
  employee_information:{
    job_title: 'доцент',
    academic_title: 'доцент' ,
    academic_degree: 'кандидат технических наук',
    place_of_work: 'кафедра СИИ',
  },
  number_of_vacancies: 5,
  additional_information: '',
  notification_order: true,
  notification_schedule: true,
  notification_protection: true,
};

const secretaryData ={
  user: [
    {
      last_name: 'Герасимова',
      first_name: 'Екатерина',
      patronymic: 'Ивановна',
      type_of_user: [
        {
          name: 'Секретарь ГЭК'
        }
      ],
      phone: '89620819991',
      email: 'ket_gerakl@mail.ru',
    }
  ],
  employee_information:[
    {
    job_title: 'старший преподаватель',
  academic_title: 'старший преподаватель' ,
  academic_degree: '-',
  place_of_work: 'кафедра СИИ',
  }
] 
};







const teachers_list=[
  { 
    number_of_vacancies: 1,
    user:
    { 
      
      id: 1,
    last_name: 'Раевич',
    first_name: 'Ксения',
    patronymic: 'Владиславовна',
    type_of_user: 'Руководитель',
   }
  },
  { 
    number_of_vacancies: 2,
    user:
    { 
      id: 2,
    last_name: 'Брежнев',
    first_name: 'Руслан',
    patronymic: 'Владимирович',
    type_of_user: 'Руководитель',
   }
  },
  { 
    number_of_vacancies: 3,
    user:
    { 
      id: 3,
    last_name: 'Пятаева',
    first_name: 'Анна',
    patronymic: 'Владимировна',
    type_of_user: 'Руководитель',
   }
  },
  {
    number_of_vacancies: 2,
    user:
    { 
      id: 4,
    last_name: 'Аникьева  ',
    first_name: 'Марина',
    patronymic: 'Анатольевна',
    type_of_user: 'Руководитель',
  },
},
{
  number_of_vacancies: 4,
  user:
  { 
    id: 5,
  last_name: 'Кушнаренко',
  first_name: 'Андрей',
  patronymic: 'Викторович'
},
},
{
  number_of_vacancies: 4,
  user:
  { 
    id: 6,
  last_name: 'Тамаровская',
  first_name: 'Анастасия',
  patronymic: 'Николаевна'
},
}
]

const generating_info={
    id: 1,
    student: {
      user:{
        id: 217,
        last_name: 'Нестерова',
        first_name: 'Виктория',
        patronymic: 'Александровна',
        phone: '89131874664',
        email: 'masha.edunova@gmail.com'
      },
      group: {
        id: 2,
        course_number: 4,
        speciality: {
          id: 1,
          name: 'Информационные системы и технологии',
          code: '09.03.02',
          field_of_study: {
            id: 1,
            code: '09.03.02.30',
            name: 'Информационные системы и технологии'
          }
        },
        name: 'КИ20-12Б'
      },
      form_of_education: 'очная',
      basis_of_study: 'за счет бюджетных ассигнований федерального бюджета',
      level_of_education: 'бакалавриат',
    },
      teacher: {
        user: {
          id: 1,
          last_name: 'Пятаева',
          first_name: 'Анна',
          patronymic: 'Владимировна',
        },
        employee_information: {
          job_title: 'доцент',
          academic_title: 'доцент' ,
          academic_degree: 'кандидат технических наук',
          place_of_work: 'кафедра СИИ',
        } 
      },
      consultant: {
        user: {
          id: 2,
          last_name: 'Брежнев',
          first_name: 'Руслан',
          patronymic: 'Владимирович',
        },
        employee_information: {
          job_title: 'доцент',
          academic_title: 'доцент' ,
          academic_degree: 'кандидат технических наук',
          place_of_work: 'кафедра СИИ',
        } 
      },
    theme: {
      id: 1,
      name: 'Разработка серверной части системы автоматизации ГИА',
      fqw_by_application: 'подразделения СФУ',
    },
    theme_str: 'Разработка клиентской части системы автоматизации ГИА',
    is_accepted_theme: false, 
    is_accepted_request: null,
    explanatory_note_submitted: null,
    publication_agree: true,
    teacher_review: null,
    review: null, 
    implementation_act: null,
    plagarism_report: null,
    type_of_fqw: 'комплексная',
    fqw_in_english: false,
    fqw_recommended: null,
    special_conditions: null, 
    preprotection_grade: null,
    additional_information: 'Общая тема комплексной ВКР: Разработка системы автоматизации процессов ГИА.Второй участник комплексной ВКР Замыслова Светлана',
}





const tableData = [
  {
    theme: "Автоматизация государственной итоговой аттестации выпускников",
    organization: { name: "всапролд", responsible: "выа", position: "ыа", additional: "ыааонлн" },
    occupied: "да",
    actions: [{ type: "edit"}, { type: "delete"}]
  },
  {
    theme: "Разработка информационной системы сбора и мониторинга данных для зеленой станции СФУ",
    organization: { name: "-", responsible: "-", position: "-", additional: "-" },
    occupied: "нет",
    actions: [{ type: "edit"}, { type: "delete"}]
  },
  {
    theme: "Разработка информационной системы для автошколы СФУ",
    organization: { name: "-", responsible: "-", position: "-", additional: "-" },
    occupied: "нет",
    actions: [{ type: "edit"}, { type: "delete"}]
  },
  {
    theme: "Разработка приложения на основе искусственного интеллекта в сфере создания музыки",
    organization: { name: "-", responsible: "-", position: "-", additional: "-" },
    occupied: "нет",
    actions: [{ type: "edit"}, { type: "delete"}]
  },
];

const requestData = [
  {
    id: 1,
    student: {
      user: {
        id: 217,
        last_name: 'Едунова',
        first_name: 'Мария',
        patronymic: 'Алексеевна',
      },
      group: {
        id: 2,
        course_number: 4,
        speciality: {
          id: 1,
          name: 'Информационные системы и технологии',
          code: '09.03.02',
          field_of_study: {
            id: 1,
            code: '09.03.02.30',
            name: 'Информационные системы и технологии'
          }
        },
        name: 'КИ20-12Б'
      },
      average_score: '4.97',
    },
    teacher:{
      user: {
        id: 1,
        last_name: 'Раевич',
        first_name: 'Ксения',
        patronymic: 'Владиславовна'
      },
      employee_information: {
        job_title: 'доцент',
        academic_title: 'доцент' ,
        academic_degree: 'кандидат технических наук',
        place_of_work: 'кафедра СИИ',
      } 
    },
    consultant: null,
    theme: {
      id: 1,
      name: 'Разработка клиентской части системы автоматизации ГИА',
    },
    theme_str: 'Разработка клиентской части системы автоматизации ГИА',
    is_accepted_theme: true, 
    is_accepted_request: true,
    explanatory_note_submitted: null,
    publication_agree: null,
    teacher_review: null,
    review: null, 
    implementation_act: null,
    plagarism_report: null,
    consultant: null,
    type_of_fqw: 'комплексная',
    fqw_in_english: false,
    fqw_recommended: null,
    special_conditions: null, 
    preprotection_grade: null,
    additional_information: 'Общая тема комплексной ВКР: Разработка системы автоматизации процессов ГИА.Второй участник комплексной ВКР Замыслова Светлана',
  },
  {
    id: 2,
    student: {
      user: {
        id: 217,
        last_name: 'Замыслова',
        first_name: 'Светлана',
        patronymic: 'Сергеевна',
      },
      group: {
        id: 2,
        course_number: 4,
        speciality: {
          id: 1,
          name: 'Информационные системы и технологии',
          code: '09.03.02',
          field_of_study: {
            id: 1,
            code: '09.03.02.30',
            name: 'Информационные системы и технологии'
          }
        },
        name: 'КИ20-12Б'
      },
      average_score: '4.73',
    },
    teacher:{
      user: {
        id: 1,
        last_name: 'Раевич',
        first_name: 'Ксения',
        patronymic: 'Владиславовна'
      },
      employee_information: {
        job_title: 'доцент',
        academic_title: 'доцент' ,
        academic_degree: 'кандидат технических наук',
        place_of_work: 'кафедра СИИ',
      } 
    },
    consultant: null,
    theme: {
      id: 2,
      name: 'Разработка серверной части системы автоматизации ГИА',
    },
    theme_str: 'Разработка серверной части системы автоматизации ГИА',
    is_accepted_theme: null, 
    is_accepted_request: null,
    explanatory_note_submitted: null,
    publication_agree: null,
    teacher_review: null,
    review: null, 
    implementation_act: null,
    plagarism_report: null,
    consultant: null,
    type_of_fqw: 'комплексная',
    fqw_in_english: false,
    fqw_recommended: null,
    special_conditions: null, 
    preprotection_grade: null,
    additional_information: 'Общая тема комплексной ВКР: Разработка системы автоматизации процессов ГИА.Второй участник комплексной ВКР Едунова Мария',
  },
  {
    id: 3,
    student: {
      user: {
        id: 217,
        last_name: 'Шахов',
        first_name: 'Сергей',
        patronymic: 'Валерьевич',
      },
      group: {
        id: 2,
        course_number: 4,
        speciality: {
          id: 1,
          name: 'Информационные системы и технологии',
          code: '09.03.02',
          field_of_study: {
            id: 1,
            code: '09.03.02.30',
            name: 'Информационные системы и технологии'
          }
        },
        name: 'КИ20-12Б'
      },
      average_score: '4.23',
    },
    teacher:{
      user: {
        id: 1,
        last_name: 'Раевич',
        first_name: 'Ксения',
        patronymic: 'Владиславовна'
      },
      employee_information: {
        job_title: 'доцент',
        academic_title: 'доцент' ,
        academic_degree: 'кандидат технических наук',
        place_of_work: 'кафедра СИИ',
      } 
    },
    consultant: null,
    theme: {
      id: 3,
      name: 'Разработка приложения для создания музыки с использованием ИИ',
    },
    theme_str: 'Разработка приложения для создания музыки с использованием ИИ',
    is_accepted_theme: false, 
    is_accepted_request: true,
    explanatory_note_submitted: null,
    publication_agree: null,
    teacher_review: null,
    review: null, 
    implementation_act: null,
    plagarism_report: null,
    consultant: null,
    type_of_fqw: 'академическая',
    fqw_in_english: false,
    fqw_recommended: null,
    special_conditions: null, 
    preprotection_grade: null,
    additional_information: '',
  },
];
  
const Work_schedule=[
  {
    id: 1,
    id_request: 1,
    stage_name: null,
    start:null,
    end: null,
    result: null,
    completion_mark: null,
    absence: null
  },
  {
    id: 3,
    id_request: 3,
    stage_name: 'обзор аналогов',
    start:16.01,
    end: 26.02,
    result: null,
    completion_mark: null,
    absence: null
  },
  {
    id: 4,
    id_request: 3,
    stage_name: 'Решение третьей задачи',
    start:'2024-05-10',
    end: '2024-05-20',
    result: null,
    completion_mark: null,
    absence: null
  },
]

 
const Work_protection=[
  {
    id: 1,
    id_request: 1,
    date: null,
    time: null,
    serial_number:null,
    final_grade: null,
    venue_number: null,
    audience_number: null,
    protocol_number: null,
    additional_information: null
  },
  {
    id: 3,
    id_request: 3,
    date: 21.06,
    time: '10:30',
    serial_number:null,
    final_grade: null,
    venue_number: null,
    audience_number: null,
    protocol_number: null,
    additional_information: null
  }
]

const info_for_table={
  requests: [
    {
      student: {
        average_score: 4.97,
        surname: 'Едунова',
        name: 'Мария',
        patronymic: 'Алексеевна',
        record_book_number: '032050313',
        phone: '89131874664',
        email: 'masha.edunova@icloud.com',
        basis_of_study: 'за счет бюджетных ассигнований федерального бюджета',
        date_of_birth: '29.10.2002',
        year_of_prev_education_completion: 2020,
        form_of_prev_education: 'аттестат о среднем общем образовании',
        year_of_admission: 2020,
        special_marks: 'отсутствуют',
        number_of_debts: '0',
        certificate_of_curriculum_completion: '',
        record_book_submitted: '', 
        diploma_with_honors: true,
        application_for_postgraduate_leave: '',
        recommended_for_admission: '', 
      },
      teacher: {
        surname: 'Раевич',
        name: 'Ксения',
        patronymic: 'Владиславовна',
      },
      theme: {
        name:  'Разработка клиентской части системы автоматизации ГИА',
        company:{
          name: '-',
          last_name_of_responsible: '',
          first_name_of_responsible: '',
          patronymic_name_of_responsible: '',
          job_title_of_resposible: '',
          additional_information: ''
        },
        reviewer: {
          surname: '',
          name: '',
          patronymic: ''
        },
       
        fqw_by_application: '-'
      },
      consultant: {
        surname: '',
        name: '',
        patronymic: ''
      },
      workProtecton: {
        final_grade: '-',
        protocol_number: 1,
        date: null
      },
      preprotection_grade: '5',
      explanatory_note_submitted: false,
      publication_agree: '',
      teacher_review: '-',
      review: '-',
      implementation_act: false,
      plagarism_report: null,
      type_of_fqw: 'комплексная',
      fqw_in_english: false,
      fqw_recommended: 'имеется публикация',
      special_conditions: false
    },

    {
      student: {
        average_score: 4.97,
        surname: 'Замыслова',
        name: 'Светлана',
        patronymic: 'Сергеевна',
        record_book_number: '032050313',
        phone: '89131874664',
        email: 'zas-1705@icloud.com',
        basis_of_study: 'за счет бюджетных ассигнований федерального бюджета',
        date_of_birth: '17.05.2002',
        year_of_prev_education_completion: 2020,
        form_of_prev_education: 'аттестат о среднем общем образовании',
        year_of_admission: 2020,
        special_marks: 'отсутствуют',
        number_of_debts: '0',
        certificate_of_curriculum_completion: '',
        record_book_submitted: '', 
        diploma_with_honors: true,
        application_for_postgraduate_leave: '',
        recommended_for_admission: '', 
      },
      teacher: {
        surname: 'Раевич',
        name: 'Ксения',
        patronymic: 'Владиславовна',
      },
      theme: {
        name:  'Разработка серверной части системы автоматизации ГИА',
        company:{
          name: '-',
          last_name_of_responsible: '',
          first_name_of_responsible: '',
          patronymic_name_of_responsible: '',
          job_title_of_resposible: '',
          additional_information: ''
        },
        reviewer: {
          surname: '',
          name: '',
          patronymic: ''
        },
       
        fqw_by_application: '-'
      },
      consultant: {
        surname: '',
        name: '',
        patronymic: ''
      },
      workProtecton: {
        final_grade: '-',
        protocol_number: 2,
      },
      preprotection_grade: '5',
      explanatory_note_submitted: false,
      publication_agree: '',
      teacher_review: '-',
      review: '-',
      implementation_act: false,
      plagarism_report: null,
      type_of_fqw: 'комплексная',
      fqw_in_english: false,
      fqw_recommended: 'имеется публикация',
      special_conditions: false
    },
  ]
  
};

 const groups_for_schedule=[
  {
    id: 1,
    speciality: {
      name: 'Информационные системы и технологии',
      code: '09.03.02',
      field_of_study: {
        code: '09.03.02.30',
        name: 'Информационные системы и технологии'
      }
    },
    name: 'КИ20-11Б'
  }, 
  {
    id: 2,
    speciality: {
      name: 'Информационные системы и технологии',
      code: '09.03.02',
      field_of_study: {
        code: '09.03.02.30',
        name: 'Информационные системы и технологии'
      }
    },
    name: 'КИ20-12Б'
  }, 
  {
    id: 3,
    speciality: {
      name: 'Информатика и вычислительная техника',
      code: '09.04.01',
      field_of_study: {
        code: '09.04.01.10',
        name: 'Информационно-управляющие системы'
      }
    },
    name: 'КИ22-01-10М'
  }, 
 
  {
    id: 4,
    speciality: {
      name: 'Информационные системы и технологии',
      code: '09.03.02',
      field_of_study: {
        code: '09.04.02.01',
        name: 'Информационные системы дистанционного зондирования Земли'
      }
    },
    name: 'КИ22-02-1М'
  }, 
  {
    id: 5,
    speciality: {
      name: 'Информационные системы и технологии',
      code: '09.03.02',
      field_of_study: {
        code: '09.04.02.05',
        name: 'Информационные системы дистанционного зондирования Земли'
      }
    },
    name: 'КИ22-02-5М'
  }, 
 ]

 const students_list_for_schedule = [
  {
    student: {
      id: 1,
      last_name: 'Едунова',
      first_name: 'Мария',
      patronymic: 'Алексеевна',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 2,
      last_name: 'Замыслова',
      first_name: 'Светлана',
      patronymic: 'Сергеевна',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 3,
      last_name: 'Малофеева',
      first_name: 'Полина',
      patronymic: 'Витальенва',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 4,
      last_name: 'Глобенко',
      first_name: 'Ирина',
      patronymic: 'Петровна',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 5,
      last_name: 'Стефани',
      first_name: 'Полина',
      patronymic: 'Александровна',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 6,
      last_name: 'Морозов',
      first_name: 'Андрей',
      patronymic: 'Олегович',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 7,
      last_name: 'Болтов',
      first_name: 'Павел',
      patronymic: 'Игоревич',
      group: {
        id: 1
      }
    }
  },
  {
    student: {
      id: 8,
      last_name: 'Питерский',
      first_name: 'Данил',
      patronymic: 'Степанович',
      group: {
        id: 3
      }
    }
  },
  {
    student: {
      id: 9,
      last_name: 'Полякова',
      first_name: 'София',
      patronymic: 'Антоновна',
      group: {
        id: 5
      }
    }
  },
  {
    student: {
      id: 10,
      last_name: 'Полежайкна',
      first_name: 'Галина',
      patronymic: 'Сергеевна',
      group: {
        id: 4
      }
    }
  },
  {
    student: {
      id: 11,
      last_name: 'Рукосуева',
      first_name: 'Катерина',
      patronymic: 'Дмитривна',
      group: {
        id: 5
      }
    }
  },
  {
    student: {
      id: 12,
      last_name: 'Нестерова',
      first_name: 'Виктория',
      patronymic: 'Александровна',
      group: {
        id: 2
      }
    }
  },
  {
    student: {
      id: 13,
      last_name: 'Шахов',
      first_name: 'Сергей',
      patronymic: 'Валерьевич',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 14,
      last_name: 'Кобан',
      first_name: 'Анна',
      patronymic: 'Никитишна',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 15,
      last_name: 'Цуник',
      first_name: 'Евгений',
      patronymic: 'Михайлович',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 16,
      last_name: 'Бэрновый',
      first_name: 'Никита',
      patronymic: 'Денисович',
      group: {
        id: 2
      }
    },
  },
  {
    student: {
      id: 17,
      last_name: 'Ряжкин',
      first_name: 'Владислав',
      patronymic: 'Сергеевич',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 18,
      last_name: 'Унтерберг',
      first_name: 'Александр',
      patronymic: 'Максимович',
      group: {
        id: 2
      }
    },
  },
  {
    student: {
      id: 19,
      last_name: 'Агуленко',
      first_name: 'Виктория',
      patronymic: 'Андреевна',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 20,
      last_name: 'Престижная',
      first_name: 'Ольга',
      patronymic: 'Михайловна',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 21,
      last_name: 'Бойков',
      first_name: 'Остап',
      patronymic: 'Бендерович',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 22,
      last_name: 'Шмагрис',
      first_name: 'Юля',
      patronymic: 'Аркадьевна',
      group: {
        id: 1
      }
    },
  },
  {
    student: {
      id: 23,
      last_name: 'Первомайский',
      first_name: 'Антон',
      patronymic: 'Дмитриевич',
      group: {
        id: 1
      }
    },
  },
    {
      student: {
        id: 24,
        last_name: 'Титовец',
        first_name: 'Данил',
        patronymic: 'Николаевич',
        group: {
          id: 2
        }
      },
  },
  
];

const schedule_stud_prof=[
  {
    id: 1,
    id_request: 1,
    stage_name: 'Ознакомление с целью и задачами работы',
    start: '04.02.2024',
    end: '10.02.2024',
    result: 'Краткое эссе по теме ВКР',
    completion_mark: true,
    absence: ''
  },
  {
    id: 2,
    id_request: 1,
    stage_name: 'Сбор литературных источников',
    start: '11.02.2024',
    end: '17.02.2024',
    result: 'Список использованных источников',
    completion_mark: true,
    absence: ''
  },
  {
    id: 3,
    id_request: 1,
    stage_name: 'Анализ собранных источников литературы',
    start: '18.02.2024',
    end: '24.02.2024',
    result: 'Реферат о проблемно предметной области',
    completion_mark: true,
    absence: ''
  },
  {
    id: 4,
    id_request: 1,
    stage_name: 'Уточнение и обоснование актуальности цели и задач ВКР',
    start: '25.02.2024',
    end: '28.02.2024',
    result: 'Окончательная формулировка цели и задач ВКР',
    completion_mark: true,
    absence: ''
  },
  {
    id: 5,
    id_request: 1,
    stage_name: 'Решение первой задачи ВКР',
    start: '18.03.2024',
    end: '31.03.2024',
    result: 'Доклад и презентация по решению первой задачи',
    completion_mark: true,
    absence: ''
  },
  {
    id: 6,
    id_request: 1,
    stage_name: 'Решение второй задачи ВКР',
    start: '01.04.2024',
    end: '14.04.2024',
    result: 'Доклад и презентация по решению второй задачи',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 7,
    id_request: 1,
    stage_name: 'Решение третьей задачи ВКР',
    start: '11.04.2024',
    end: '24.04.2024',
    result: 'Доклад и презентация по решению третьей задачи',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 8,
    id_request: 1,
    stage_name: 'Решение четвертой задачи ВКР',
    start: '25.04.2024',
    end: '8.05.2024',
    result: 'Доклад и презентация по решению четвертой задачи',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 9,
    id_request: 1,
    stage_name: 'Апробация системы',
    start: '7.05.2024',
    end: '9.05.2024',
    result: 'Доклад и презентация по результатам апробации системы',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 10,
    id_request: 1,
    stage_name: 'Подготовка доклада и презентации по теме ВКР',
    start: '10.05.2024',
    end: '15.05.2024',
    result: 'Доклад с презентацией по теме ВКР',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 11,
    id_request: 1,
    stage_name: 'Компоновка отчета по результатам решения задач ВКР',
    start: '15.05.2024',
    end: '20.05.2024',
    result: 'Отчет по результатам решения задач ВКР',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 12,
    id_request: 1,
    stage_name: 'Предварительная защита результатов ВКР',
    start: '21.05.2024',
    end: null,
    result: 'Доклад с презентацией по теме ВКР',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 13,
    id_request: 1,
    stage_name: 'Нормоконтроль (Н/К)',
    start: '17.06.2024',
    end: null,
    result: 'Пояснительная записка, презентация ВКР',
    completion_mark: true,
    absence: ''
  }, 
  {
    id: 14,
    id_request: 1,
    stage_name: 'Защита ВКР ',
    start: '21.06.2024',
    end: null,
    result: 'Пояснительная записка, доклад и презентация по результатам бакалаврской работы',
    completion_mark: true,
    absence: ''
  }, 
]

const request_data_task={
  student: {
    user: {
      last_name: 'Едунова',
      first_name: 'Мария',
      patronymic: 'Алексеевна'
    },
    group: {
      name: 'КИ20-12Б',
      speciality:{
        code: '09.03.02',
        name: 'Информационные системы и технологии',
        field_of_study:{
          code: '09.03.02.30',
          name: 'Информационные системы и технологии',
        }
      }
    }
  },
    theme: {
      name: 'Разработка клиентской части системы автоматизации процессов гиа'
    },
    teacher: {
      user: {
        last_name: 'Раевич',
      first_name: 'Ксения',
      patronymic: 'Владиславовна',
      job_title: 'доцент',
      academic_title: 'доцент' ,
      academic_degree: 'кандидат технических наук',
      place_of_work: 'кафедра СИИ',
      }
    }
  
}
const request_data_task2={
  student: {
    user: {
      last_name: 'Нестерова',
      first_name: 'Виктория',
      patronymic: 'Александровна'
    },
    group: {
      name: 'КИ20-12Б',
      speciality:{
        code: '09.03.02',
        name: 'Информационные системы и технологии',
        field_of_study:{
          code: '09.03.02.30',
          name: 'Информационные системы и технологии',
        }
      }
    }
  },
    theme: {
      name: 'Мобильная игра "Секретный язык для детей"'
    },
    teacher: {
      user: {
        last_name: 'Пятаева',
      first_name: 'Анна',
      patronymic: 'Владимировна',
      job_title: 'доцент',
      academic_title: 'доцент' ,
      academic_degree: 'кандидат технических наук',
      place_of_work: 'кафедра СИИ',
      }
    }
  
}


const protection_schedule=[
  {
    id: 1,
    date: new Date(2024, 5, 19),
    venue_number: '17',
    audience_number: 'УЛК 1-15',
     group: {
      id: 1,
      name: 'КИ20-11Б',
      speciality: {
        name: 'Информационные системы и технологии',
        code: '09.03.02',
        field_of_study: {
          code: '09.03.02.30',
          name: 'Информационные системы и технологии'
        }
      },
     }
  },
  {
    id: 2,
    date: new Date(2024, 5, 20),
    venue_number: '17',
    audience_number: 'УЛК 1-15',
     group: {
      id: 1,
      name: 'КИ20-11Б',
      speciality: {
        name: 'Информационные системы и технологии',
        code: '09.03.02',
        field_of_study: {
          code: '09.03.02.30',
          name: 'Информационные системы и технологии'
        }
      },
     }
  },
  {
    id: 3,
    date: new Date(2024, 5, 21),
    venue_number: '17',
    audience_number: 'УЛК 1-16',
     group: {
      id: 2,
      name: 'КИ20-12Б',
      speciality: {
        name: 'Информационные системы и технологии',
        code: '09.03.02',
        field_of_study: {
          code: '09.03.02.30',
          name: 'Информационные системы и технологии'
        }
      },
     }
  },
  {
    id: 4,
    date: new Date(2024, 5, 22),
    venue_number: '17',
    audience_number: 'УЛК 1-16',
     group: {
      id: 3,
      name: 'КИ22-01-10М',
      speciality: {
        name: 'Информатика и вычислительная техника',
        code: '09.04.01',
        field_of_study: {
          code: '09.04.01.10',
          name: 'Информационно-управляющие системы'
        }
      },
     },
  },
  {
    id: 5,
    date: new Date(2024, 5, 25),
    venue_number: '17',
    audience_number: 'УЛК 1-16',
     group: {
      id: 4,
      name: 'КИ22-02-1М',
      speciality: {
        name: 'Информационные системы и технологии',
        code: '09.03.02',
        field_of_study: {
          code: '09.04.02.01',
          name: 'Информационные системы дистанционного зондирования Земли'
        }
      },
     },
  },
  {
    id: 6,
    date: new Date(2024, 5, 25),
    venue_number: '17',
    audience_number: 'УЛК 1-16',
     group: {
      id: 5,
      name: 'КИ22-02-5М',
      speciality: {
        name: 'Информационные системы и технологии',
        code: '09.03.02',
        field_of_study: {
          code: '09.04.02.05',
          name: 'Информационные системы дистанционного зондирования Земли'
        }
      },
     },
  },
  {
    id: 7,
    date: new Date(2024, 5, 26),
    venue_number: '17',
    audience_number: 'УЛК 1-17',
    
     additional_information: 'Резервный день для участников комиссионной пересдачи (для всех групп) - на торжественное вручение дипломов не попадают'
  },

]

const themes_list=[
  {
    id: 1,
    name: 'Тема кафедры 1',
    reviewer: {
      user:{
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null
       }
    },
    teacher: {
      user:{
       id: null,
       last_name: null,
       first_name: null,
       patronymic: null
      }
    },
    department: true,
    company: {
      name: 'Очень интересно',
      last_name_of_responsible: ' ',
      first_name_of_responsible: ' ',
      patronymic_of_responsible: ' ',
      job_title_of_responsible: ' ',
      additional_information: ' '
    },
    fqw_by_application: 'Подразделения СФУ',
    free: true,
    by_student: false

  },
  {
    id: 2,
    name: 'Тема кафедры 2',
    reviewer: {
      user:{
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null
       }
    },
    teacher: {
      user:{
       id: null,
       last_name: null,
       first_name: null,
       patronymic: null
      }
    },
    department: true,
    company: {
      name: null,
      last_name_of_responsible: null,
      first_name_of_responsible: null,
      patronymic_of_responsible: null,
      job_title_of_responsible: null,
      additional_information: null
    },
    fqw_by_application: 'Предприятия',
    free: true,
    by_student: false
  },
  {
    id: 3,
    name: 'Тема кафедры 3',
    reviewer: {
      user:{
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null
       }
    },
    teacher: {
      user:{
       id: null,
       last_name: null,
       first_name: null,
       patronymic: null
      }
    },
    department: true,
    company: {
      name: 'It_Решения',
      last_name_of_responsible: 'Иванов',
      first_name_of_responsible: 'Иван',
      patronymic_of_responsible: 'Иванович',
      job_title_of_responsible: 'project manager',
      additional_information: null
    },
    fqw_by_application: 'Предприятия',
    free: false,
    by_student: false
  },
  {
    id: 4,
    name: 'Система автоматизации государственной итоговой аттестации',
    reviewer: {
      user:{
        id: null,
        last_name: 'Краснов',
        first_name: 'Петр',
        patronymic: 'Геннадьевич'
       }
    },
    teacher: {
      user:{
       id: 1,
       last_name: 'Раевич',
       first_name: 'Ксения',
       patronymic: 'Владиславовна'
      }
    },
    department: false,
    company: {
      name: null,
      last_name_of_responsible: null,
      first_name_of_responsible: null,
      patronymic_of_responsible: null,
      job_title_of_responsible: null,
      additional_information: null
    },
    fqw_by_application: 'Подразделения сфу',
    free: false,
    by_student: false
  },
  {
    id: 5,
    name: 'Какая-то умная тема Брежнева',
    reviewer: {
      user:{
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null
       }
    },
    teacher: {
      user:{
       id: 2,
       last_name: 'Брежнев',
       first_name: 'Руслан',
       patronymic: 'Владимирович'
      }
    },
    department: false,
    company: {
      name: null,
      last_name_of_responsible: null,
      first_name_of_responsible: null,
      patronymic_of_responsible: null,
      job_title_of_responsible: null,
      additional_information: null
    },
    fqw_by_application: 'Подразделения сфу',
    free: false,
    by_student: false
  },
  {
    
      id: 6,
      name: 'Распознавание отчетов Енисейской губернии',
      reviewer: {
        user:{
          id: null,
          last_name: 'ваав',
          first_name: 'dfdfd',
          patronymic: 'dffdfd'
         }
      },
      teacher: {
        user:{
         id: 3,
         last_name: 'Пятаева',
         first_name: 'Анна',
         patronymic: 'Владимировна'
        }
      },
      department: false,
      company: {
        name: null,
        last_name_of_responsible: null,
        first_name_of_responsible: null,
        patronymic_of_responsible: null,
        job_title_of_responsible: null,
        additional_information: null
      },
      fqw_by_application: 'Подразделения сфу',
      free: false,
      by_student: false
    
  },
  {
    id: 7,
    name: 'Распознавание отчетов Хабаровской губернии',
    reviewer: {
      user:{
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null
       }
    },
    teacher: {
      user:{
       id: null,
       last_name: null,
       first_name: null,
       patronymic: null
      }
    },
    department: false,
    company: {
      name: null,
      last_name_of_responsible: null,
      first_name_of_responsible: null,
      patronymic_of_responsible: null,
      job_title_of_responsible: null,
      additional_information: null
    },
    fqw_by_application: 'Предложена студентом',
    free: false,
    by_student: true
},
{
  id: 8,
  name: 'Автоматизация работы зеленой станции',
  reviewer: {
    user:{
      id: null,
      last_name: 'ваав',
      first_name: 'dfdfd',
      patronymic: 'dffdfd'
     }
  },
  teacher: {
    user:{
     id: 1,
     last_name: 'Раевич',
     first_name: 'Ксения',
     patronymic: 'Владиславовна'
    }
  },
  department: false,
  company: {
    name: null,
    last_name_of_responsible: null,
    first_name_of_responsible: null,
    patronymic_of_responsible: null,
    job_title_of_responsible: null,
    additional_information: null
  },
  fqw_by_application: 'Подразделения сфу',
  free: false,
  by_student: false
},
{
  id: 9,
  name: 'Самый масштабный проигрыш в доту 2024',
  reviewer: {
    user:{
      id: 4,
      last_name: 'Молошаг',
      first_name: 'Василий',
      patronymic: 'Александрович'
     }
  },
  teacher: {
    user:{
     id: 1,
     last_name: 'Раевич',
     first_name: 'Ксения',
     patronymic: 'Владиславовна'
    }
  },
  department: false,
  company: {
    name: 'Киберспортивная лига сфу',
    last_name_of_responsible: null,
    first_name_of_responsible: null,
    patronymic_of_responsible: null,
    job_title_of_responsible: null,
    additional_information: null
  },
  fqw_by_application: 'Подразделения сфу',
  free: true,
  by_student: false
},
]

const composition_of_sec=[
  {
    user:{
      id:17,
      last_name: 'Попов',
      first_name: 'Алексей',
      patronymic: 'Михайлович'
    },
    employee_information: {
      job_title: 'директор института информатики и телекоммуникаций ФГБОУ ВО "Сибирский государственный университет науки и технологий имени академика М.Ф.Решетнева"',
      academic_title: 'профессор' ,
      academic_degree: 'доктор физ-мат. наук',
      place_of_work: 'кафедра СИИ',
    }, 
    id_member_of_SEC: 1,
    chairman_of_SEC: true
  },
  {
    user:{
      id:18,
      last_name: 'Маглинец',
      first_name: 'Юрий',
      patronymic: 'Анатольевич'
    },
    employee_information: {
      job_title: 'руководитель НУЛ "Информационная поддержка космиечского мониторинга"',
      academic_title: 'профессор' ,
      academic_degree: 'кандидат техн. наук',
      place_of_work: 'ИКИТ СФУ',
    }, 
    id_member_of_SEC: 2,
    chairman_of_SEC: false
  },
  {
    user:{
      id:19,
      last_name: 'Раевич',
      first_name: 'Ксения',
      patronymic: 'Владиславовна'
    },
    employee_information: {
      job_title: 'руководитель НУЛ "Информационная поддержка космиечского мониторинга"',
      academic_title: 'доцент' ,
      academic_degree: 'кандидат техн. наук',
      place_of_work: 'каф.СИИ, ИКИТ СФУ',
    }, 
    id_member_of_SEC: 3,
    chairman_of_SEC: false
  },
  {
    user:{
      id:20,
      last_name: 'Пятаева',
      first_name: 'Анна',
      patronymic: 'Владимировна'
    },
    employee_information: {
      job_title: 'доцент',
      academic_title: 'доцент' ,
      academic_degree: 'кандидат техн. наук',
      place_of_work: 'каф.СИИ, ИКИТ СФУ',
    }, 
    id_member_of_SEC: 4,
    chairman_of_SEC: false
  },
  {
    user:{
      id:21,
      last_name: 'Брежнев',
      first_name: 'Руслан',
      patronymic: 'Владимирович'
    },
    employee_information: {
      job_title: 'доцент',
      academic_title: 'доцент' ,
      academic_degree: 'кандидат техн. наук',
      place_of_work: 'каф.СИИ, ИКИТ СФУ',
    }, 
    id_member_of_SEC: 5,
    chairman_of_SEC: false
  },
  {
    user:{
      id:22,
      last_name: 'Кочкин',
      first_name: 'Павел',
      patronymic: 'Владимирович'
    },
    employee_information: {
      job_title: 'генеральный директор',
      academic_title: ' ' ,
      academic_degree: ' ',
      place_of_work: 'ООО "ПК Ситалл"',
    }, 
    id_member_of_SEC: 6,
    chairman_of_SEC: false
  },
  {
    user:{
      id:23,
      last_name: 'Коченов',
      first_name: 'Дмитрий',
      patronymic: 'Александрович'
    },
    employee_information: {
      job_title: 'зам директора',
      academic_title: ' ' ,
      academic_degree: 'кандидат физ.-мат. наук',
      place_of_work: 'ООО "Объемный мир"',
    }, 
    id_member_of_SEC: 7,
    chairman_of_SEC: false
  },
  {
    user:{
      id:23,
      last_name: 'Сорокин',
      first_name: 'Евгений',
      patronymic: 'Александрович'
    },
    employee_information: {
      job_title: 'директор',
      academic_title: ' ' ,
      academic_degree: ' ',
      place_of_work: 'департамент развития систем анализа данных ООО "РУСАЛ ИТЦ"',
    }, 
    id_member_of_SEC: 8,
    chairman_of_SEC: false
  },
]

const requestAndWorkProtection= [
  {
id: 1,
request:  {
  id: 1,
  student: {
    user: {
      id: 217,
      last_name: 'Едунова',
      first_name: 'Мария',
      patronymic: 'Алексеевна',
    },
    group: {
      id: 2,
      course_number: 4,
      speciality: {
        id: 1,
        name: 'Информационные системы и технологии',
        code: '09.03.02',
        field_of_study: {
          id: 1,
          code: '09.03.02.30',
          name: 'Информационные системы и технологии'
        }
      },
      name: 'КИ20-12Б'
    },
    average_score: '4.97',
  },
  teacher:{
    user: {
      id: 1,
      last_name: 'Раевич',
      first_name: 'Ксения',
      patronymic: 'Владиславовна'
    },
    employee_information: {
      job_title: 'доцент',
      academic_title: 'доцент' ,
      academic_degree: 'кандидат технических наук',
      place_of_work: 'кафедра СИИ',
    } 
  },
  consultant: null,
  theme: {
    id: 1,
    name: 'Разработка клиентской части системы автоматизации ГИА',
    reviewer: {
      user:{
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null
       },
       employee_information: {
        job_title: null,
        academic_title: null,
        academic_degree: null,
        place_of_work: null,
      } 
    },
  },
  theme_str: 'Разработка клиентской части системы автоматизации ГИА',
  is_accepted_theme: true, 
  is_accepted_request: true,
  explanatory_note_submitted: null,
  publication_agree: null,
  teacher_review: null,
  review: null, 
  implementation_act: null,
  plagarism_report: null,
  consultant: null,
  type_of_fqw: 'комплексная',
  fqw_in_english: false,
  fqw_recommended: null,
  special_conditions: null, 
  preprotection_grade: null,
  additional_information: 'Общая тема комплексной ВКР: Разработка системы автоматизации процессов ГИА.Второй участник комплексной ВКР Замыслова Светлана',
},
work_protection: {
  id: 1,
    date: new Date(2024, 5, 21),
    time: '9:00',
    serial_number:1,
    final_grade: null,
    venue_number: '17',
    audience_number: 'УЛК 1-16',
    protocol_number: 1,
    additional_information: null
}
  },
  {
    id: 2,
    request:  {
      id: 2,
      student: {
        user: {
          id: 217,
          last_name: 'Замыслова',
          first_name: 'Светлана',
          patronymic: 'Сергеевна',
        },
        group: {
          id: 2,
          course_number: 4,
          speciality: {
            id: 1,
            name: 'Информационные системы и технологии',
            code: '09.03.02',
            field_of_study: {
              id: 1,
              code: '09.03.02.30',
              name: 'Информационные системы и технологии'
            }
          },
          name: 'КИ20-12Б'
        },
        average_score: '4.97',
      },
      teacher:{
        user: {
          id: 1,
          last_name: 'Раевич',
          first_name: 'Ксения',
          patronymic: 'Владиславовна'
        },
        employee_information: {
          job_title: 'доцент',
          academic_title: 'доцент' ,
          academic_degree: 'кандидат технических наук',
          place_of_work: 'кафедра СИИ',
        } 
      },
      consultant: null,
      theme: {
        id: 1,
        name: 'Разработка серверной части системы автоматизации ГИА',
        reviewer: {
          user:{
            id: null,
            last_name: null,
            first_name: null,
            patronymic: null
           },
           employee_information: {
            job_title: null,
            academic_title: null,
            academic_degree: null,
            place_of_work: null,
          } 
        },
      },
      theme_str: 'Разработка серверной части системы автоматизации ГИА',
      is_accepted_theme: true, 
      is_accepted_request: true,
      explanatory_note_submitted: null,
      publication_agree: null,
      teacher_review: null,
      review: null, 
      implementation_act: null,
      plagarism_report: null,
      consultant: null,
      type_of_fqw: 'комплексная',
      fqw_in_english: false,
      fqw_recommended: null,
      special_conditions: null, 
      preprotection_grade: null,
      additional_information: 'Общая тема комплексной ВКР: Разработка системы автоматизации процессов ГИА.Второй участник комплексной ВКР Замыслова Светлана',
    },
    work_protection: {
      id: 2,
        date: new Date(2024, 5, 21),
        time: '9:20',
        serial_number:2,
        final_grade: null,
        venue_number: '17',
        audience_number: 'УЛК 1-16',
        protocol_number: 2,
        additional_information: null
    }
      },
      {
        id: 2,
        request:  {
          id: 2,
          student: {
            user: {
              id: 217,
              last_name: 'Фомкин',
              first_name: 'Денис',
              patronymic: 'Денисович',
            },
            group: {
              id: 1,
              course_number: 4,
              speciality: {
                id: 1,
                name: 'Информационные системы и технологии',
                code: '09.03.02',
                field_of_study: {
                  id: 1,
                  code: '09.03.02.30',
                  name: 'Информационные системы и технологии'
                }
              },
              name: 'КИ20-11Б'
            },
            average_score: '4.97',
          },
          teacher:{
            user: {
              id: 2,
              last_name: 'Аникьева',
              first_name: 'Марина',
              patronymic: 'Анатольевна'
            },
            employee_information: {
              job_title: 'доцент',
              academic_title: 'доцент' ,
              academic_degree: 'кандидат технических наук',
              place_of_work: 'кафедра СИИ',
            } 
          },
          consultant: null,
          theme: {
            id: 1,
            name: 'Разработка серверной части системы автоматизации ГИА',
            reviewer: {
              user:{
                id: null,
                last_name: null,
                first_name: null,
                patronymic: null
               },
               employee_information: {
                job_title: null,
                academic_title: null,
                academic_degree: null,
                place_of_work: null,
              } 
            },
          },
          theme_str: 'Разработка серверной части системы автоматизации ГИА',
          is_accepted_theme: true, 
          is_accepted_request: true,
          explanatory_note_submitted: null,
          publication_agree: null,
          teacher_review: null,
          review: null, 
          implementation_act: null,
          plagarism_report: null,
          consultant: null,
          type_of_fqw: 'академическая',
          fqw_in_english: false,
          fqw_recommended: null,
          special_conditions: null, 
          preprotection_grade: null,
          additional_information: null,
        },
        work_protection: {
          id: 2,
            date: new Date(2024, 5, 20),
            time: '11:20',
            serial_number:3,
            final_grade: null,
            venue_number: '17',
            audience_number: 'УЛК 1-16',
            protocol_number: 3,
            additional_information: null
        }
          },
]

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Authentication /> },
      { path: "/profile_student", element: <ProfileStudent/> },
      { path: "/generate_application", element: <GenerateApplicaton/> },
      { path: "/method_recommendations", element: <MethodRecommendations/> },
      { path: "/choose_teacher", element: <ChooseTeacher /> },
      { path: "/edit_student_profile", element: <EditStudentPage/> },
      { path: "/create_request/:teacherName", element: <CreateRequest/> },
      { path: "/view_themes_s", element: <ViewThemesListPage/> },
      { path: "/form_marks_completion", element: <FormMarksCompletion /> },
      { path: "/view_student_request", element: <ViewCreatedRequest /> },
      { path: "/view_protection_schedule_teacher", element: <ViewProtectionSchedule /> },
      { path: "/view_protection_schedule_student", element: <ViewProtectionSchedule /> },
      { path: "/profile_teacher", element: <ProfileTeacher/> },
      { path: "/edit_teacher_profile", element: <EditTeacherPage /> },
      { path: "/edit_theme_list_teacher", element: <EditThemeListTeacher/> },
      { path: "/supervised_students", element: <SupervisedStudents /> },
      { path: "/view_protection_schedule", element: <ViewProtectionSchedule/> },
      { path: "/create_schedule_work_fqw", element: <CreateScheduleWorkFQW /> },   
      { path: "/publish_orders", element: <PublishOrders secretaryData={secretaryData}/> },
      { path: "/profile_secretary", element: <ProfileSecretary/> },
      { path: "/view_themes_sec", element: <ViewThemesListPage /> },
      { path: "/view_themes", element: <ViewThemesListPage /> },
      { path: "/edit_secretary_profile", element: <EditSecretaryProfile /> },
      { path: "/edit_theme_list_secretary", element: <EditThemeListSecretary/> },
      { path: "/secretary_table_data", element: <SecretaryTableData/> },

      { path: "/choose_theme", element: <ChooseTheme data={studentData} themes_list={themes_list}/> },
      { path: "/create_schedule_protection", element: <CreateSheduleProtection /> },
      { path: "/view_protection_schedule_persons", element: <ViewProtectionSchedulePersonsPage /> },
      { path: "/view_protection_schedule_persons_s", element: <ViewProtectionSchedulePersonsPage /> },
      { path: "/view_protection_schedule_persons_t", element: <ViewProtectionSchedulePersonsPage /> },

      { path: "/generate_protocols", element: <GenerateProtocolsPage /> },

    ]
  },
]);
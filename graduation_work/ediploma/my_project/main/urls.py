from django.contrib import admin
from django.urls import path, include

from .views import TeacherAllView, StudentProfileView, TeacherProfileView, SecretaryProfileView,\
    TeacherRequestAllView, ThemeAllView, StudentRequestView, StudentWithRequestView, WorkProtectionAllView,\
    StudentRequestFormationView, GroupAllView, CompositionOfSECView, WorkScheduleByRequestView,\
    TeacherRequestAllWithScheduleAndPersonalWorkProtectionView, TeacherThemeView, SecretaryBigTableView,\
    GroupAndStudentView, EmployeeInformationView

urlpatterns = [
    path('student/profile/', StudentProfileView.as_view(), name='student-profile '),
    path('teacher/profile/', TeacherProfileView.as_view(), name='teacher-profile'),
    path('secretary/profile/', SecretaryProfileView.as_view(), name='secretary-profile'),
    path('teachers/', TeacherAllView.as_view(), name='teacher-all'),
    path('themes/', ThemeAllView.as_view(), name='theme-all'),
    path('groups/', GroupAllView.as_view(), name='group-all'),
    path('student/request/', StudentRequestView.as_view(), name='student-request '),
    path('student/student_request/', StudentWithRequestView.as_view(), name='student-student_request'),
    path('work_protection/', WorkProtectionAllView.as_view(), name='work_protection-all'),
    path('student/student_request_formation/', StudentRequestFormationView.as_view(), name='student-student_request_formation'),
    path('teacher/work_schedule_by_request/', WorkScheduleByRequestView.as_view(), name='teacher-work_schedule_by_request'),
    path('teacher/request_all/', TeacherRequestAllView.as_view(), name='teacher-request_all'),
    path('teacher/request_all_work_schedule_personal_work_protection/', TeacherRequestAllWithScheduleAndPersonalWorkProtectionView.as_view(),
         name='teacher-request_all_work_schedule_personal_work_protection'),
    path('composition_Of_SEC/', CompositionOfSECView.as_view(), name='composition_Of_SEC'),
    path('teacher/themes/', TeacherThemeView.as_view(), name='teacher-themes'),
    path('secretary/big_table/', SecretaryBigTableView.as_view(), name='secretary-big_table'),
    path('groups_students/', GroupAndStudentView.as_view(), name='group_student'),
    path('employee_information/', EmployeeInformationView.as_view(), name='employee_information-all'),
]
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Group, Student, Teacher, EmployeeInformation, Company, Theme, Request, PersonalWorkProtection, \
    WorkProtection, WorkSchedule, TypeOfOrder, Order, FileOrder, FieldOfStudy, Specialty, CompositionOfSEC

admin.site.register(Group)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(EmployeeInformation)
admin.site.register(Company)
admin.site.register(Theme)
admin.site.register(Request)
admin.site.register(PersonalWorkProtection)
admin.site.register(WorkProtection)
admin.site.register(WorkSchedule)
admin.site.register(TypeOfOrder)
admin.site.register(Order)
admin.site.register(FileOrder)
admin.site.register(FieldOfStudy)
admin.site.register(Specialty)
admin.site.register(CompositionOfSEC)


from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .models import Student, Teacher, Request, WorkSchedule, EmployeeInformation, Theme, Company, WorkProtection, Group, \
    CompositionOfSEC, PersonalWorkProtection
from authentication.models import User
from .serializers import TeacherProfileSerializer, StudentProfileSerializer, WorkScheduleSerializer, GroupSerializer,\
    RequestSerializer, EmployeeProfileSerializer, TeacherAllSerializer, ThemeSerializer, NumberOfRequestsSerializer, \
    RequestWithoutStudentSerializer, WorkProtectionSerializer, ThemeWithoutTeacherSerializer, PersonalWorkProtectionSerializer,\
    StudentGroupAndAverageScoreSerializer, RequestTeacherAllSerializer, CompositionOfSECSerializer, StudentGroupIdSerializer
from authentication.serializers import UserSerializer, FLPSerializer
from rest_framework.response import Response
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token


class StudentProfileView(APIView):

    def get(self, request):
        u = request.user
        s = Student.objects.filter(user=u)
        r = Request.objects.filter(student=u)
        ws = WorkSchedule.objects.filter(request__in=r)
        tei = EmployeeInformation.objects.filter(user__in=[req.teacher for req in r])
        data = {
            "user": StudentProfileSerializer(s, many=True).data,
            "request_without_student": RequestWithoutStudentSerializer(r, many=True).data,
            "teacher_employee_information": EmployeeProfileSerializer(tei, many=True).data,
            "work_schedule": WorkScheduleSerializer(ws, many=True).data
        }


        return Response(data)


class TeacherProfileView(APIView):

    def get(self, request):
        u = request.user
        t = Teacher.objects.filter(user=u)
        ei = EmployeeInformation.objects.filter(user=u)
        them = Theme.objects.filter(teacher=u)
        data = {
            "user": TeacherProfileSerializer(t, many=True).data,
            "employee_information": EmployeeProfileSerializer(ei, many=True).data,
            "theme_list_without_teacher": ThemeWithoutTeacherSerializer(them, many=True).data,
        }
        return Response(data)




class SecretaryProfileView(APIView):

    def get(self, request):
        u = request.user
        sec = User.objects.filter(id=u.id)
        ei = EmployeeInformation.objects.filter(user=u)
        them = Theme.objects.exclude(department__isnull=True)
        data = {
            "user": UserSerializer(sec, many=True).data,
            "employee_information": EmployeeProfileSerializer(ei, many=True).data,
            "theme_list_department": ThemeWithoutTeacherSerializer(them, many=True).data,
        }
        return Response(data)


class TeacherAllView(APIView):

    def get(self, request):
        t = Teacher.objects.all()
        data = {
            "teachers_list": TeacherAllSerializer(t, many=True).data,
        }
        return Response(data)


class ThemeAllView(APIView):

    def get(self, request):
        t = Theme.objects.all()
        data = {
            "theme_list": ThemeSerializer(t, many=True).data,
        }
        return Response(data)


class GroupAllView(APIView):

    def get(self, request):
        g = Group.objects.all()
        data = {
            "group_list": GroupSerializer(g, many=True).data,
        }
        return Response(data)


class StudentRequestView(APIView):

    def get(self, request):
        u = request.user
        r = Request.objects.filter(student=u)
        s = Student.objects.filter(user=u)
        data = {
            "request": RequestSerializer(r, many=True).data,
            "number_of_requests": NumberOfRequestsSerializer(s, many=True).data
        }
        return Response(data)


class StudentWithRequestView(APIView):

    def get(self, request):
        u = request.user
        r = Request.objects.filter(student=u)
        s = Student.objects.filter(user=u)
        tei = EmployeeInformation.objects.filter(user__in=[req.teacher for req in r])
        cei = EmployeeInformation.objects.filter(user__in=[req.consultant for req in r])
        data = {
            "request_without_student": RequestWithoutStudentSerializer(r, many=True).data,
            "student": StudentProfileSerializer(s, many=True).data,
            "teacher_employee_information": EmployeeProfileSerializer(tei, many=True).data,
            "consultant_employee_information": EmployeeProfileSerializer(cei, many=True).data,
        }
        return Response(data)


class WorkProtectionAllView(APIView):

    def get(self, request):
        wp = WorkProtection.objects.all()
        data = {
            "work_protection_list": WorkProtectionSerializer(wp, many=True).data,
        }
        return Response(data)


class StudentRequestFormationView(APIView):

    def get(self, request):
        u = request.user
        r = Request.objects.filter(student=u)
        t = Theme.objects.all()
        teach = Teacher.objects.all()
        data = {
            "request_without_student": RequestWithoutStudentSerializer(r, many=True).data,
            "theme_list": ThemeSerializer(t, many=True).data,
            "teachers_list": TeacherAllSerializer(teach, many=True).data,
        }


        return Response(data)



class WorkScheduleByRequestView(APIView):

    def get(self, request):
        r_id = request.data.get('request_id')
        r = Request.objects.filter(id=r_id)
        ws = WorkSchedule.objects.filter(request__in=r)
        data = {
            "work_schedule": WorkScheduleSerializer(ws, many=True).data
        }
        return Response(data)


class TeacherRequestAllView(APIView):

    def get(self, request):
        u = request.user
        r = Request.objects.filter(teacher=u)
        s = Student.objects.filter(user__in=[req.student for req in r])
        data = {
            "request_list": RequestTeacherAllSerializer(r, many=True).data,
            "student_list": StudentGroupAndAverageScoreSerializer(s, many=True).data,
        }
        return Response(data)


class TeacherRequestAllWithScheduleAndPersonalWorkProtectionView(APIView):

    def get(self, request):
        u = request.user
        r = Request.objects.filter(teacher=u)
        s = Student.objects.filter(user__in=[req.student for req in r])
        ws = WorkSchedule.objects.filter(request__in=r)
        pwpr = PersonalWorkProtection.objects.filter(request__in=r)
        data = {
            "request_list": RequestTeacherAllSerializer(r, many=True).data,
            "student_list": StudentGroupAndAverageScoreSerializer(s, many=True).data,
            "work_schedule_list": WorkScheduleSerializer(ws, many=True).data,
            "personal_work_protection_list": PersonalWorkProtectionSerializer(pwpr, many=True).data,
        }
        return Response(data)


class CompositionOfSECView(APIView):

    def get(self, request):
        msec = CompositionOfSEC.objects.all()
        ei = EmployeeInformation.objects.filter(user__in=[req.member_of_SEC for req in msec])
        data = {
            "member_of_SEC": CompositionOfSECSerializer(msec, many=True).data,
            "employee_information": EmployeeProfileSerializer(ei, many=True).data,
        }
        return Response(data)


class SecretaryRequestWithGeneralAndPersonalWorkProtectionView(APIView):

    def get(self, request):
        r = Request.objects.all()
        gwpr = WorkProtection.objects.all()
        pwpr = PersonalWorkProtection.objects.all()
        data = {
            "request_list": RequestSerializer(r, many=True).data,
            "general_work_protection_list": WorkProtectionSerializer(gwpr, many=True).data,
            "personal_work_protection_list": PersonalWorkProtectionSerializer(pwpr, many=True).data,
        }
        return Response(data)


class TeacherThemeView(APIView):

    def get(self, request):
        u = request.user
        t = Theme.objects.filter(teacher=u)
        data = {
            "teacher_theme_list": ThemeSerializer(t, many=True).data,
        }
        return Response(data)


class SecretaryBigTableView(APIView):

    def get(self, request):
        r = Request.objects.all()
        gwpr = WorkProtection.objects.all()
        pwpr = PersonalWorkProtection.objects.all()
        s = Student.objects.all()
        data = {
            "request_list": RequestSerializer(r, many=True).data,
            "general_work_protection_list": WorkProtectionSerializer(gwpr, many=True).data,
            "personal_work_protection_list": PersonalWorkProtectionSerializer(pwpr, many=True).data,
            "student_list": StudentProfileSerializer(s, many=True).data,
        }
        return Response(data)


class GroupAndStudentView(APIView):

    def get(self, request):
        g = Group.objects.all()
        s = Student.objects.all()
        data = {
            "group_list": GroupSerializer(g, many=True).data,
            "student_list": StudentGroupIdSerializer(s, many=True).data,
        }
        return Response(data)


class EmployeeInformationView(APIView):

    def get(self, request):
        ei = EmployeeInformation.objects.all()
        data = {
            "employee_information": EmployeeProfileSerializer(ei, many=True).data,
        }
        return Response(data)

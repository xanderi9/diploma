from rest_framework import serializers
from authentication.serializers import UserSerializer, FLPSerializer
from .models import Student, Teacher, Group, FieldOfStudy, Specialty, Theme, Request, WorkSchedule, EmployeeInformation,\
    Company, WorkProtection, CompositionOfSEC, PersonalWorkProtection


class FieldOfStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldOfStudy
        fields = ('code', 'name',)


class SpecialtySerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudySerializer()

    class Meta:
        model = Specialty
        fields = ('code', 'name', 'field_of_study')


class GroupSerializer(serializers.ModelSerializer):
    specialty = SpecialtySerializer()

    class Meta:
        model = Group
        fields = ('id', 'name', 'specialty', 'course_number', )


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    group = GroupSerializer()

    class Meta:
        model = Student
        fields = '__all__'

class EmployeeProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeInformation
        fields = ('user_id', 'job_title', 'academic_title', 'academic_degree', 'place_of_work')


class TeacherProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Teacher
        fields = '__all__'


class TeacherAllSerializer(serializers.ModelSerializer):
    user = FLPSerializer()

    class Meta:
        model = Teacher
        fields = ('user', 'number_of_vacancies')


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class ThemeSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer()
    teacher = UserSerializer()
    company = CompanySerializer()

    class Meta:
        model = Theme
        fields = '__all__'


class ThemeWithoutTeacherSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer()
    company = CompanySerializer()

    class Meta:
        model = Theme
        exclude = ('teacher',)


class NumberOfRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('number_of_requests',)


class RequestSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    teacher = UserSerializer()
    consultant = UserSerializer()
    theme = ThemeSerializer()

    class Meta:
        model = Request
        fields = '__all__'


class RequestWithoutStudentSerializer(serializers.ModelSerializer):
    teacher = UserSerializer()
    consultant = UserSerializer()
    theme = ThemeSerializer()

    class Meta:
        model = Request
        exclude = ('student',)


class WorkProtectionSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = WorkProtection
        fields = '__all__'


class WorkScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkSchedule
        fields = '__all__'


class RequestTeacherAllSerializer(serializers.ModelSerializer):
    student = FLPSerializer()
    teacher = UserSerializer()
    consultant = UserSerializer()
    theme = ThemeSerializer()

    class Meta:
        model = Request
        fields = '__all__'

class StudentGroupAndAverageScoreSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = Student
        fields = ('user_id', 'group', 'average_score')


class PersonalWorkProtectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalWorkProtection()
        fields = '__all__'


class CompositionOfSECSerializer(serializers.ModelSerializer):
    member_of_SEC = FLPSerializer()

    class Meta:
        model = CompositionOfSEC
        fields = '__all__'


class StudentGroupIdSerializer(serializers.ModelSerializer):
    user = FLPSerializer()

    class Meta:
        model = Student
        fields = ('user', 'group')


















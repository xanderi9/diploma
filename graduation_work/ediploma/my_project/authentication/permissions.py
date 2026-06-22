from rest_framework.permissions import BasePermission

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.type_of_user == 'teacher'

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.type_of_user == 'student'

class IsSecretary(BasePermission):
    def has_permission(self, request, view):
        return request.user.type_of_user == 'secretary'

class IsMemberOfSAC(BasePermission):
    def has_permission(self, request, view):
        return request.user.type_of_user == 'member_of_SAC'

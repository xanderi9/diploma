from rest_framework import serializers
from .models import User
from rest_framework.fields import SerializerMethodField
from django.contrib.auth.models import Group


class TypeOfUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(serializers.ModelSerializer):
    type_of_user = TypeOfUserSerializer(source='groups', many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'patronymic',
                  'email', 'phone', 'password', 'type_of_user']
        extra_kwargs = {'password': {'write_only': True}}


class FLPSerializer(serializers.ModelSerializer):
    type_of_user = TypeOfUserSerializer(source='groups', many=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'patronymic', 'type_of_user']



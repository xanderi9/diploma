from django.shortcuts import render
from .models import User
from .serializers import UserSerializer, TypeOfUserSerializer
from django.contrib.auth import authenticate, login, get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated



class UserLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            if not created:
                token.delete()  # Delete the token if it was already created
                token = Token.objects.create(user=user)

            return Response({'token': token.key, 'first_name': user.first_name, 'last_name': user.last_name,
                             'patronymic': user.patronymic,
                             "type_of_user": TypeOfUserSerializer(user.groups, many=True).data})
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)



class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        request.auth.delete()
        return Response({'detail': 'Successfully logged out.'})



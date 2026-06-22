from django.urls import path, include
from .views import UserLoginView, UserLogoutView

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    # Add other URLs here
]
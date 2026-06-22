from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        group_names = self.groups.all().values_list('name')
        if group_names.exists():
            return '{} {} {}'.format(self.first_name, self.last_name, group_names.get())
        return '{} {}'.format(self.first_name, self.last_name)


    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
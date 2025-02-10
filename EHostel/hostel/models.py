from django.db import models

# Create your models here.

class Student(models.Model):
    admission_number = models.CharField(primary_key=True, max_length=15)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10)
    gender = models.CharField(max_length=1, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class Owner(models.Model):
    username = models.CharField(primary_key=True, max_length=25)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=255)

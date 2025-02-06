from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('student/login', stud_login, name="stud_login"),
    path('student/signin', signin_student, name="stud_signin")
]

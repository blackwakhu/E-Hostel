from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('student/login', stud_login, name="stud_login"),
    path('student/signin/<str:req_type>', signin_student, name="stud_signin"),
    path('mainpage/', main_page, name='main_page')
]

from django.urls import path 

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('student/login', stud_login, name='stud_login'),
    path('student/login/<str:req_type>', stud_log, name='stud_log'),
    path('mainpage/', main_page, name='main_page'),
    path('logout/', logout, name='logout')
]

from django.urls import path 

from .views import *

urlpatterns = [
    path('', index, name='index'),

    path('student/login', stud_login, name='stud_login'),
    path('student/login/<str:req_type>', stud_log, name='stud_log'),
    path('student/mainpage/', student_main_page, name='student_main_page'),

    path('owner/login', owner_login, name='owner_login'),
    path('owner/login/<str:req_type>', owner_log, name='owner_log'),
    path('owner/mainpage/', owner_main_page, name='owner_main_page'),

    path('logout/', logout, name='logout')
]

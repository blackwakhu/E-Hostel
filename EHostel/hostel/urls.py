from django.urls import path 

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('logout/', logout, name='logout'),

# deals with the student views
    path('student/login/', stud_login, name='stud_login'),
    path('student/login/<str:req_type>/', stud_log, name='stud_log'),
    path('student/mainpage/', student_main_page, name='student_main_page'),
    path('student/profile/', student_profile, name='student_profile' ),
    path('student/hostel/<int:hostel_id>/', student_hostel, name="student_hostel"),
    path('student/hostel/<int:hostel_id>/comment/', student_comment_hostel, name="student_comment_hostel"),
    path('student/hostel/<int:hostel_id>/comment/<comment_id>/', student_comment, name="student_comment"),
    path('student/hostel/<int:hostel_id>/book/', book_hostel, name='book_hostel'),

# deals with the owner views
    path('owner/login/', owner_login, name='owner_login'),
    path('owner/login/<str:req_type>/', owner_log, name='owner_log'),
    path('owner/mainpage/', owner_main_page, name='owner_main_page'),
    path('owner/hostel/add/', add_hostel, name="add_hostel"),
    path('owner/hostel/<int:hostel_id>/', owner_hostel, name="owner_hostel"),
    path('owner/hostel/<int:hostel_id>/add_amenity/', add_amenity, name="add_amenity"),
    path('owner/hostel/<int:hostel_id>/book/<int:book_id>/<str:choice>/', verify_booking, name='verify_booking')
]

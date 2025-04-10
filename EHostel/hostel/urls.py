from django.urls import path 

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('logout/', logout, name='logout'),

# deals with the student views
    path('student/login/', stud_login, name='stud_login'),
    path('student/login/<str:req_type>/', stud_log, name='stud_log'),
    path('student/mainpage/', student_main_page, name='student_main_page'),
    path('student/hostel/<int:hostel_id>/', student_hostel, name="student_hostel"),
    path('student/hostel/<int:hostel_id>/comment/', student_comment_hostel, name="student_comment_hostel"),

# deals with the owner views
    path('owner/login/', owner_login, name='owner_login'),
    path('owner/login/<str:req_type>/', owner_log, name='owner_log'),
    path('owner/mainpage/', owner_main_page, name='owner_main_page'),
    path('owner/hostel/add/', add_hostel, name="add_hostel"),
    path('owner/hostel/<int:hostel_id>/', owner_hostel, name="owner_hostel"),
    path('owner/hostel/<int:hostel_id>/add_amenity/<str:amenity>/', add_amenity, name="add_amenity"),
    path('owner/hostel/<int:hostel_id>/remove_amenity/<str:amenity>/', delete_amenity, name="delete_amenity"),
    path('owner/hostel/book/<int:book_id>/<str:choice>/', verify_booking, name='verify_booking'),

# some api routes
# for the hostel
    path('api/owner/student_bookings/<hostel_id>/', get_bookings, name="get_bookings"),
    path('student/hostel/comment/create/', add_review, name="create_review"),
    path('api/student/hostel/search', get_hostel_search, name="get_hostel_search"),
    path('api/student/hostel/hostel/list', get_hostel_list, name="get_hostel_list"),
    path('api/owner/hostel/amenities/<hostel_id>/', create_amenity, name="create_amenity"),
    path('api/student/book/status/<str:admin_number>/<int:hostel_id>/', get_booking_status, name="get_booking_status"),
    path('api/student/book/status/<str:admin_number>/<int:hostel_id>/<str:book_status>/', student_book_hostel, name="student_book_hostel"),
    path('api/owner/student_bookings/<int:hostel_id>/active/', active_booking, name="active_booking"),
    path('api/owner/student_bookings/<int:hostel_id>/active/download/<str:status>/', download_active_student, name='download_active_student'),
    path('api/owner/hostel_update/<int:hostel_id>/<str:column>/', hostel_update, name="hostel_update"),


# for the owner
    path('api/owner/update/<str:uname>/<str:column>/', owner_update, name="owner_update"),

# for the student
    path('api/student/update/<admin>/<str:column>/', stud_update, name="student_update"),

#  for admin
    path('myadmin/', my_admin, name="my_admin"),
    path("myadmin/get_students/", admin_get_students, name="admin-get-students"),
    path("myadmin/get_owners/", admin_get_owners, name="admin-get-owners"),
    path("myadmin/get_hostels/", admin_get_hostels, name="admin-get-hostels"),
    path("myadmin/get_bookings/", admin_get_bookings, name="admin-get-bookings"),

    path("myadmin/get_students/download/",  admin_get_students_download, name="admin-get-students-download"),
    path("myadmin/get_owners/download/",  admin_get_owners_download, name="admin-get-owners-download"),
    path("myadmin/get_hostels/download/",  admin_get_hostels_download, name="admin-get-hostels-download"),
    path("myadmin/get_bookings/download/",  admin_get_bookings_download, name="admin-get-bookings-download"),

    path("myadmin/get_students/download/<str:search_term>/",  admin_get_students_download_query, name="admin-get-students-download-query"),
    path("myadmin/get_owners/download/<str:search_term>/",  admin_get_owners_download_query, name="admin-get-owners-download-query"),
    path("myadmin/get_hostels/download/<str:search_term>/<int:min_price>/<int:max_price>/<str:room_type>/",  admin_get_hostels_download_query, name="admin-get-hostels-download-query"),
    path("myadmin/get_bookings/download/<str:search_term>/<str:start_date>/<str:stop_date>/<str:status>/",  admin_get_bookings_download_query, name="admin-get-bookings-download-query"),
    
]

# def admin_get_bookings_download_query(request, search_term, start_date, stop_date, status):

# def admin_get_hostels_download_query(request, search_term, min_price, max_price, type):
from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "index.html")

def stud_login(request):
    return render(request, "student/login.html")

def main_page(request):
    pass 

def hostel_page(request):
    pass

def search_page(request):
    pass

def signin_student(request, type):
    pass

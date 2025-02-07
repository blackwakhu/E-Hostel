from django.shortcuts import render
from .forms import *

# Create your views here.

def index(request):
    return render(request, "index.html")

def stud_login(request):
    signup_form = StudentSignUp()
    return render(request, "student/login.html", {"signup": signup_form})

def main_page(request):
    pass 

def hostel_page(request):
    pass

def search_page(request):
    pass

def signin_student(request, type):
    pass

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.hashers import make_password, check_password

from .models import *

# Create your views here.

def index(request):
    return render(request, "index.html")

def stud_login(request):
    return render(request, "student/login.html")


def stud_log(request, req_type):
    if request.method == "POST":
        if req_type == 'signin':
            admission_number = request.POST.get("adminNumberin")
            password = request.POST.get("passwdin")
            student = get_object_or_404(Student, pk=admission_number)
            print("gotten the student")
            print(student.first_name)
            print(student.password)
            if check_password(password, student.password):
                print("inside the password checker")
                return redirect('main_page')
        elif req_type == 'signup':
            admission_number = request.POST.get('adminNumber')
            first_name = request.POST.get('fName')
            last_name = request.POST.get('lName')
            email = request.POST.get('email')
            phone_number = request.POST.get('phoneNumber')
            gender = request.POST.get('gender') 
            password = request.POST.get('passwd')

            student = Student(
                admission_number=admission_number,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone_number=phone_number,
                password=make_password(password),
                gender=gender
            )

            student.save()
            return redirect('main_page')

    return redirect('stud_login')

def main_page(request):
    return render(request, 'main.html')

def logout(request):
    request.session.flush()
    return redirect('index')
from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from django.contrib.auth import login, authenticate
from django.contrib.auth.hashers import make_password, check_password
# from .forms import *
from .models import *

# Create your views here.

def index(request):
    return render(request, "index.html")

def stud_login(request):
    # signup_form = StudentSignUp()
    return render(request, "student/login.html")

def main_page(request):
    if request.user.is_authenticated:
        return render(request, "main_page.html")
    else:
        return redirect("stud_login")

def hostel_page(request):
    pass

def search_page(request):
    pass

def signin_student(request, req_type):
    if request.method == "POST":
        if req_type == 'signup':
            admission_number = request.POST.get('adminNumber')
            first_name = request.POST.get('fName')
            last_name = request.POST.get('lName')
            email = request.POST.get('email')
            phone_number = request.POST.get('phoneNumber')
            gender = request.POST.get('gender') 
            password = request.POST.get('passwd')

            # Basic validation
            if not all([admission_number, first_name, last_name, email, phone_number, password]):
                return HttpResponseBadRequest("Missing required fields.")  

            # Check if admission number or email already exists
            if Student.objects.filter(admission_number=admission_number).exists():
                return render(request, 'student/login.html', {'error_message_signup': "Admission number already exists."})
            if Student.objects.filter(email=email).exists():
                return render(request, 'student/login.html', {'error_message_signup': "Email already exists."})

            # Create student account
            student = Student.objects.create(
                admission_number=admission_number,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone_number=phone_number,
                gender=gender,
                password=make_password(password),  # Hash the password
            )

            login(request, student)
            return redirect('main_page')  

        elif req_type == 'signin':
            admission_number = request.POST.get('admission_number')
            password = request.POST.get('password')

            try:
                student = Student.objects.get(admission_number=admission_number)

                # Use Django's `check_password` to validate hashed passwords
                if check_password(password, student.password):  
                    login(request, student)
                    return redirect('student_dashboard')  
                else:
                    error_message = "Invalid admission number or password."
            except Student.DoesNotExist:
                error_message = "Invalid admission number or password."
            except Exception as e:
                error_message = f"An error occurred: {e}"

            return render(request, 'signin.html', {'error_message_signin': error_message})

    return redirect("stud_login")
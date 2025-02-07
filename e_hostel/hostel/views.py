from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from django.contrib.auth import login, authenticate
from django.contrib.auth.hashers import make_password, check_password
# from .forms import *
from .models import *
import logging

# Create your views here.

logger = logging.getLogger(__name__)

def index(request):
    return render(request, "index.html")

def stud_login(request):
    # signup_form = StudentSignUp()
    return render(request, "student/login.html")

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

        # Check for existing student
        if Student.objects.filter(admission_number=admission_number).exists():
            return render(request, 'student/register.html', {'error_message': "Admission number already exists."})
        if Student.objects.filter(email=email).exists():
            return render(request, 'student/register.html', {'error_message': "Email already exists."})

        # Create student using StudentManager
        student = Student.objects.create_user(
            admission_number=admission_number,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            password=password,
            gender=gender
        )

        # Authenticate and log in the student
        student = authenticate(request, username=admission_number, password=password)
        if student:
            request.session['_auth_user_id'] = student.pk  # Manually store user ID
            request.session['_auth_user_backend'] = 'django.contrib.auth.backends.ModelBackend'  # Ensure correct backend
            request.session.save()
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

def main_page(request):
    print("Entering main page")
    print("User:", request.user)
    print("User type:", type(request.user))
    print("Is authenticated:", request.user.is_authenticated)
    print("Session data:", request.session.items())
    if request.user.is_authenticated:
        print('entering main page')
        return render(request, "main_page.html")
    else:
        print("redirecting")
        return redirect("stud_login")
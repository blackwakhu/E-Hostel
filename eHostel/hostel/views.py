from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from django.contrib.auth import login, authenticate
from django.contrib.auth.hashers import make_password
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

            # Basic validation (you'll likely want more robust validation)
            if not all([admission_number, first_name, last_name, email, phone_number]):
                return HttpResponseBadRequest("Missing required fields.") # Return a 400 Bad Request if validation fails

            # Check for duplicate admission number or email
            if Student.objects.filter(admission_number=admission_number).exists():
                return render(request, 'student/login.html', {'error_message_signup': "Admission number already exists."})
            if Student.objects.filter(email=email).exists():
                return render(request, 'student/login.html', {'error_message_signup': "Email already exists."})

            # Create and save the Student object
            student = Student(
                admission_number=admission_number,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone_number=phone_number,
                gender=gender,
                password=make_password(password),
            )
            student.save()
            user = authenticate(request, admission_number=admission_number, password=password)  # Authenticate
            if user is not None:
                login(request, user)  # Log in
                return redirect('main_page')  # Redirect to dashboard
            else:
                # This should rarely happen if the user was just created, but handle it
                error_message = "Error during login after registration. Please try again."
                return render(request, 'student/login.html', {'error_message': error_message})
        if req_type == 'signin':
            admission_number = request.POST.get('admission_number')
            password = request.POST.get('password')

            try:
                student = Student.objects.get(admission_number=admission_number)
                if student.password == password: # Basic password check (INSECURE - see below)
                    login(request, student)  # Log the student in
                    return redirect('student_dashboard')  # Redirect to student dashboard
                else:
                    error_message = "Invalid admission number or password."
            except Student.DoesNotExist:
                error_message = "Invalid admission number or password."
            except Exception as e: # Catch any other error
                error_message = f"An error occurred: {e}"

        return render(request, 'signin.html', {'error_message_signin': error_message})

    return redirect("stud_login")

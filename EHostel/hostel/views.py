from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.hashers import make_password, check_password

from .models import *

# Create your views here.

def index(request):
    return render(request, "index.html")

def logout(request):
    request.session.flush()
    return redirect('index')



def stud_login(request):
    return render(request, "student/login.html")

def stud_log(request, req_type):
    if request.method == "POST":
        if req_type == 'signin':
            admission_number = request.POST.get("adminNumberin")
            password = request.POST.get("passwdin")
            student = get_object_or_404(Student, pk=admission_number)
            if check_password(password, student.password):
                request.session["admission_number"] = admission_number
                request.session["user"] = "student"
                return redirect('student_main_page')
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
            request.session["admission_number"] = admission_number
            request.session["user"] = "student"
            return redirect('student_main_page')

    return redirect('stud_login')

def student_main_page(request):
    return render(request, 'student/main.html')



def owner_login(request):
    return render(request, "owner/login.html")

def owner_log(request, req_type):
    if request.method == "POST":
        if req_type == 'signin':
            username = request.POST.get("unamein")
            password = request.POST.get("passwdin")
            owner = get_object_or_404(Owner, pk=username)
            if check_password(password, owner.password):
                request.session["username"] = username
                request.session["user"] = "owner"
                return redirect('owner_main_page')
        elif req_type == 'signup':
            username = request.POST.get('uname')
            first_name = request.POST.get('fname')
            last_name = request.POST.get('lname')
            email = request.POST.get('email')
            phone_number = request.POST.get('phone_number')
            password = request.POST.get('passwd')

            owner = Owner(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone_number=phone_number,
                password=make_password(password)
            )

            owner.save()
            request.session["username"] = username
            request.session["user"] = "owner"
            return redirect('owner_main_page')

    return redirect('owner_login')

def owner_main_page(request):
    if 'username' in request.session and request.session["user"] == "owner":
        return render(request, "owner/main.html", {"username": request.session["username"]})
    else:
        return redirect('owner_login')

def add_hostel(request):
    username = request.session["username"]
    owner = Owner.objects.get(username=username)
    if request.method == "POST":
        hostel_name = request.POST.get("name")
        price_per_month = request.POST.get("price")
        number_rooms = request.POST.get("rooms")
        room_type = request.POST.get("room_type")
        location = request.POST.get("location_description")
        county = request.POST.get("county")
        town = request.POST.get("town")
        locality = request.POST.get("locality")

        hostel = Hostel(
            hostel_name = hostel_name,
            price_per_month = price_per_month,
            number_rooms = number_rooms,
            room_type = room_type,
            location = location,
            county = county,
            town = town,
            locality = locality,
            available_rooms = number_rooms,
            owner = owner
        )
        hostel.save()
        return redirect('owner_main_page')
    return redirect('owner_main_page')
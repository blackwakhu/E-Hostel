from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password

from .models import *
from .forms import *

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
    hostels = Hostel.objects.all()
    return render(request, 'student/main.html', {
        "hostels": hostels
        })

def student_hostel(request, hostel_id):
    hostel = Hostel.objects.get(pk=hostel_id)
    comments = Review.objects.filter(hostel=hostel)
    return render(request, 'student/hostel.html', {
        "hostel": hostel,
        "comments": comments,
        "reviews": comments
    })

def student_comment_hostel(request, hostel_id):
    student = Student.objects.get(admission_number=request.session["admission_number"])
    hostel = Hostel.objects.get(pk=hostel_id)
    if request.method == "POST":
        comment = request.POST.get("comment")
        review = Review(
            hostel=hostel,
            comment=comment,
            student=student
        )
        review.save()
    return redirect('student_hostel', hostel_id)

def student_comment(request, hostel_id, comment_id):
    student = Student.objects.get(admission_number=request.session["admission_number"])
    hostel = Hostel.objects.get(pk=hostel_id)
    prev_review = Review.objects.get(pk=comment_id)
    if request.method == "POST":
        comment = request.POST.get("comment")
        review = Review(
            hostel=hostel,
            comment=comment,
            student=student,
            parent_review=prev_review
        )
        review.save()
    return redirect('student_hostel', hostel_id)

def book_hostel(request, hostel_id):
    hostel = Hostel.objects.get(pk=hostel_id)
    student = Student.objects.get(admission_number=request.session["admission_number"])
    book = Booking(
        hostel=hostel,
        student=student,
        status="Pending"
    )
    book.save()
    return redirect('student_hostel', hostel_id)

def student_profile(request):
    student = Student.objects.get(admission_number=request.session["admission_number"])
    hostels = Hostel.objects.all()
    booked_hostels = []
    for hostel in hostels:
        try:
            book = Booking.objects.get(hostel=hostel, student=student)
            booked_hostels.append({'hostel': hostel, 'status': book.status})
        except Booking.DoesNotExist:
            pass  # No booking for this hostel by this student

    return render(request, "student/student.html",{
        "student":student, 
        'hostels': booked_hostels
    })




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
        username = request.session["username"]
        owner = Owner.objects.get(username=username)
        hostels = Hostel.objects.filter(owner=owner)
        print(hostels)
        return render(request, "owner/main.html", {"username": request.session["username"], "hostels":hostels})
    else:
        return redirect('owner_login')

def add_hostel(request):
    username = request.session["username"]
    owner = Owner.objects.get(username=username)
    if request.method == "POST":
        hostel_name = request.POST.get("hname")
        price_per_month = int(request.POST.get("hprice"))
        number_rooms = int(request.POST.get("hrooms"))
        room_type = request.POST.get("hroom_type")
        location = request.POST.get("hlocation_description")
        county = request.POST.get("hcounty")
        town = request.POST.get("htown")
        locality = request.POST.get("hlocality")

        if not hostel_name or not room_type or not location or not county or not town or not locality:
            return HttpResponse("Please fill in all required fields.")

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
        return redirect('owner_hostel', hostel.hostel_name)
    return redirect('owner_main_page')

def owner_hostel(request, hostel_name):
    hostel = Hostel.objects.get(hostel_name=hostel_name)
    amenities = HostelAmenities.objects.filter(hostel=hostel)
    if request.method == "POST":
        form = HostelImageForm(request.POST, request.FILES)
        if form.is_valid():
            hostel_image = form.save(commit=False)
            hostel_image.hostel=hostel 
            hostel_image.save()
            return redirect('owner_hostel', hostel_name)
    else:
        form = HostelImageForm()
    return render(request, 'owner/hostel.html', {
        "hostel": hostel, 
        "amenities": amenities,
        "hostelImageForm": form
        })

def add_amenity(request, hostel_name):
    hostel = Hostel.objects.get(hostel_name=hostel_name)
    if request.method == "POST":
        amenity = request.POST.get("hamenity")
        hamenity = HostelAmenities(
            hostel = hostel,
            amenity = amenity
        )
        hamenity.save()
    return redirect("owner_hostel", hostel_name)


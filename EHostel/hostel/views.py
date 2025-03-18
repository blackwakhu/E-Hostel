from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import *
from .forms import *

from functools import wraps

import json

# Create your views here.

# decorators
def user_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if 'username' in request.session and request.session['user'] == "owner":
            return view_func(request, *args, **kwargs)
        elif 'admission_number' in request.session and request.session['user'] == 'student':
            return view_func(request, *args, **kwargs)
        else:
            return redirect('index')
    return _wrapped_view


# main views
def index(request):
    """This is the route to the first the first page the the user sees when they access the system"""
    return render(request, "index.html")

def logout(request):
    """This is the view that when pressed logs out the user and closes their account"""
    request.session.flush()
    return redirect('index')



# student views
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

@user_required
def student_main_page(request):
    if "admission_number" not in request.session:
        return redirect('index')
    hostels = Hostel.objects.all()
    student = Student.objects.get(admission_number=request.session["admission_number"])
    booked_hostels = []
    bookings = Booking.objects.filter(student=student)
    for booking in bookings:
        booked_hostels.append({'hostel': booking.hostel, 'status': booking.status})
    return render(request, 'student/main.html', {
        "hostels": hostels,
        "student": student,
        "booked_hostels": booked_hostels
        })

@user_required
def student_hostel(request, hostel_id):
    hostel = get_object_or_404(Hostel, pk=hostel_id)
    amenities = HostelAmenities.objects.filter(hostel=hostel)
    images = HostelImages.objects.filter(hostel=hostel)
    comments = Review.objects.filter(hostel=hostel)

    context = {
        'hostel': hostel,
        'amenities': amenities,
        'images': images,
        'comments': comments,
        'admission_number': request.session["admission_number"]
    }

    return render(request, 'student/hostel.html', context)

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
    booked_hostels = []
    bookings = Booking.objects.filter(student=student)
    for booking in bookings:
        booked_hostels.append({'hostel': booking.hostel, 'status': booking.status})

    return render(request, "student/student.html",{
        "student":student, 
        'hostels': booked_hostels
    })


# owner routes
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
        return render(request, "owner/main.html", {"username": request.session["username"], "hostels":hostels, "owner": owner})
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
        return redirect('owner_hostel', hostel.id)
    return redirect('owner_main_page')

def owner_hostel(request, hostel_id):
    hostel = Hostel.objects.get(pk=hostel_id)
    booked_people = []
    bookings = Booking.objects.filter(hostel=hostel)
    for booking in bookings:
        booked_people.append({"id": booking.id,"status": booking.status, "student": booking.student})
    amenities = HostelAmenities.objects.filter(hostel=hostel)
    if request.method == "POST":
        form = HostelImageForm(request.POST, request.FILES)
        if form.is_valid():
            hostel_image = form.save(commit=False)
            hostel_image.hostel=hostel 
            hostel_image.save()
            return redirect('owner_hostel', hostel_id)
    else:
        form = HostelImageForm()
    return render(request, 'owner/hostel.html', {
        "hostel": hostel, 
        "amenities": amenities,
        "hostelImageForm": form,
        "bookings": booked_people
        })

def add_amenity(request, hostel_id):
    hostel = Hostel.objects.get(pk=hostel_id)
    if request.method == "POST":
        amenity = request.POST.get("hamenity")
        hamenity = HostelAmenities(
            hostel = hostel,
            amenity = amenity
        )
        hamenity.save()
    return redirect("owner_hostel", hostel_id)

def verify_booking(request, hostel_id, book_id, choice):
    hostel = Hostel.objects.get(pk=hostel_id)
    book = Booking.objects.get(pk=book_id)
    if book.status != 'Accepted' or book.status != "Rejected" and hostel.available_rooms > 0:
        if choice == 'accept':
            book.status = "Accepted"
            hostel.available_rooms -= 1
            hostel.save()
        elif choice == 'reject':
            book.status = "Rejected"
        book.save()
    return redirect("owner_hostel", hostel_id)


# API routes
def get_bookings(request, hostel_id):
    hostel = Hostel.objects.get(pk=hostel_id)
    booked_people = []
    bookings = Booking.objects.filter(hostel=hostel)
    for booking in bookings:
        student = {
            "admin": booking.student.admission_number,
            "email": booking.student.email,
            "first_name": booking.student.first_name,
            "last_name": booking.student.last_name,
            "contact": booking.student.phone_number,
            "gender": booking.student.gender
        }
        booked_people.append({
            "id": booking.id,
            "status": booking.status, 
            "student": student
        })
    return JsonResponse({"bookings": booked_people, "vacancies": hostel.available_rooms}, safe=False)

@csrf_exempt
def stud_update(request, admin, column):
    student = Student.objects.get(admission_number=admin)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            item = data.get(column)
            if item:
                setattr(student, column, item)
                student.save()
                return JsonResponse({"message": "saved successfully", "output": getattr(student, column)})
            else: 
                return JsonResponse({"message": "Some information was not provided"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON data."}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def owner_update(request, uname, column):
    owner = Owner.objects.get(username=uname)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            item = data.get(column)
            if item:
                setattr(owner, column, item)
                owner.save()
                return JsonResponse({"message": "saved successfully", "output": getattr(owner, column)})
            else: 
                return JsonResponse({"message": "Some information was not provided"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON data."}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def create_review(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            student_id = data.get('student_id')
            hostel_id = data.get('hostel_id')
            comment = data.get('comment')
            rating = data.get('rating')
            parent_review_id = data.get('parent_review_id')
            student = get_object_or_404(Student, pk=student_id)
            hostel = get_object_or_404(Hostel, pk=hostel_id)

            parent_review = None

            if parent_review_id:
                parent_review = get_object_or_404(Review, pk=parent_review_id)
            
            review = Review(student=student, hostel=hostel, comment=comment, rating=rating, parent_review=parent_review)
            review.save()

            return JsonResponse({'message': 'Review created successfully', 'review_id': review.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except (KeyError, ValueError):
            return JsonResponse({'error': 'Missing or invalid data'}, status=400)
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
        except Hostel.DoesNotExist:
            return JsonResponse({'error': 'Hostel not found'}, status=404)
        except Review.DoesNotExist:
            return JsonResponse({'error': 'Parent review not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_reviews(request, hostel_id):
    hostel = get_object_or_404(Hostel, pk=hostel_id)
    reviews = Review.objects.filter(hostel=hostel).order_by('-created_at')

    reviews_data = []
    for review in reviews:
        review_data = {
            'id': review.id,
            'student': review.student.first_name, #or other student data.
            'hostel': review.hostel.hostel_name, #or other hostel data.
            'comment': review.comment,
            'rating': review.rating,
            'created_at': review.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'parent_review_id': review.parent_review.id if review.parent_review else None,
            'replies': []
        }
        replies = review.replies.all().order_by('created_at') #get replies, in order.
        for reply in replies:
            reply_data = {
                'id': reply.id,
                'student': reply.student.first_name, #or other student data.
                'comment': reply.comment,
                'created_at': reply.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            review_data['replies'].append(reply_data)
        reviews_data.append(review_data)

    return JsonResponse(reviews_data, safe=False)

def get_hostel_list(request):
    page_number = request.GET.get('page', 1)
    hostels = Hostel.objects.all().order_by('id')

    paginator = Paginator(hostels, 25)

    try:
        page = paginator.page(page_number)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)

    hostel_data = []
    for hostel in page.object_list:
        first_image = HostelImages.objects.filter(hostel=hostel).first()
        image_url = first_image.image.url if first_image else None

        hostel_data.append({
            'id': hostel.id,
            'hostel_name': hostel.hostel_name,
            'price_per_month': hostel.price_per_month,
            'locality': hostel.locality,
            'image': image_url,
        })

    response_data = {
        'hostels': hostel_data,
        'page': page.number,
        'num_pages': paginator.num_pages,
        'has_previous': page.has_previous(),
        'has_next': page.has_next(),
        'previous_page_number': page.previous_page_number() if page.has_previous() else None,
        'next_page_number': page.next_page_number() if page.has_next() else None,
    }

    return JsonResponse(response_data)

def get_hostel_search(request):
    search_term = request.GET.get('search', '')
    if search_term:
        hostels = Hostel.objects.filter(
                Q(hostel_name__icontains=search_term) |
                Q(county__icontains=search_term) |
                Q(town__icontains=search_term) |
                Q(locality__icontains=search_term)
            ).values() #values() converts the queryset to a list of dictionaries.
        return JsonResponse(list(hostels), safe=False) #safe=False allows non-dict objects to be serialized.
    else:
        return JsonResponse([], safe=False)
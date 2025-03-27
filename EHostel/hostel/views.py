from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.template.loader import get_template
from weasyprint import HTML, CSS
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.staticfiles import finders
from django.conf import settings

import os

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
    bookings = Booking.objects.filter(student=student).filter(Q(status="Pending") | Q (status="Accept") | Q(status="Reject"))
    for booking in bookings:
        first_image = HostelImages.objects.filter(hostel=booking.hostel).first()
        image_url = first_image.image.url if first_image else None
        booked_hostels.append({
            'hostel': booking.hostel, 
            'status': booking.status, 
            'image': image_url
        })
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

    if request.headers.get('x-requested-with') == 'XMLHttpRequest': #Return json for ajax request.
        review_data = [{
            'id': review.id,
            'student': review.student.first_name,
            'comment': review.comment,
            'rating': review.rating,
            'created_at': review.created_at.isoformat(),
            'replies': [{
                'id': reply.id,
                'student': reply.student.first_name,
                'comment': reply.comment,
                'rating': reply.rating,
                'created_at': reply.created_at.isoformat(),
            } for reply in review.replies.all().order_by('created_at')]
        } for review in comments]
        return JsonResponse({'reviews': review_data})

    return render(request, 'student/hostel.html', context)

@user_required
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
        myHostels = []
        for hostel in hostels:
            first_image = HostelImages.objects.filter(hostel=hostel.id).first()
            image_url = first_image.image.url if first_image else None
            myHostels.append({"hostel": hostel, "image":image_url })
        return render(request, "owner/main.html", {"username": request.session["username"], "hostels":myHostels, "owner": owner})
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
    amenities = HostelAmenities.objects.filter(hostel=hostel)
    amenities_list = [i.amenity for i in amenities]
    gAmenities = Amenities.objects.all()
    images = HostelImages.objects.filter(hostel=hostel)
    if request.method == "POST":
        form = HostelImageForm(request.POST, request.FILES)
        if form.is_valid():
            hostel_image = form.save(commit=False)
            hostel_image.hostel=hostel 
            hostel_image.save()
            return redirect('owner_hostel', hostel_id)
    else:
        form = HostelImageForm()
    if request.headers.get('x-requested-with') == 'XMLHttpRequest': 
        amenity_data = [{"amenity": amenity.amenity.amenity} for amenity in amenities]
        globalAmenities = [{"amenity": amenity.amenity} for amenity in gAmenities if amenity not in amenities_list]
        return JsonResponse({'amenities': amenity_data, 'gamenities': globalAmenities})
    return render(request, 'owner/hostel.html', {
        "hostel": hostel, 
        "amenities": amenities,
        "hostelImageForm": form,
        "images": images
        })

def verify_booking(request, book_id, choice):
    book = Booking.objects.get(pk=book_id)
    if book.hostel.available_rooms > 0 and choice == "Accept":
        book.status = "Accept"
        hostel = book.hostel
        hostel.available_rooms -= 1
        hostel.save()
    elif choice == "Reject":
        book.status = "Reject"
    elif choice == "End Lease":
        book.status = "End Lease"
        hostel = book.hostel
        hostel.available_rooms += 1
        hostel.save()
    book.save()
    return JsonResponse({"success": True})

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

class TooSmallError(Exception):
    def __init__(self, message):
        super().__init__(message)


@csrf_exempt
def hostel_update(request, hostel_id, column):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debugging print
            print("Column to update:", column)

            if column not in data:
                return JsonResponse({"error": f"Column '{column}' not found in request"}, status=400)

            hostel_item = Hostel.objects.get(pk=hostel_id)

            value = data[column]  # Get value from request JSON

            if column == "number_rooms":
                print("Updating number_rooms...") 
                myvalue = int(value)
                value = int(value)# More descriptive print
                if value < hostel_item.number_rooms:
                    rooms_difference = hostel_item.number_rooms - value
                    if rooms_difference > hostel_item.available_rooms:
                        raise TooSmallError("This update will result in some students losing hostels. Rejected")
                    else:
                        hostel_item.available_rooms -= rooms_difference #Corrected available_rooms calculation
                else:
                    hostel_item.available_rooms += (value - hostel_item.number_rooms) #correct available rooms calculation when number of rooms increases.
                hostel_item.number_rooms = myvalue
                print("number_rooms updated successfully.") #More descriptive print.
            else:
                setattr(hostel_item, column, value)
            
            setattr(hostel_item, column, value)  # Dynamically update field
            hostel_item.save()

            return JsonResponse({"message": "Saved successfully", "output": value})

        except Hostel.DoesNotExist:
            return JsonResponse({"error": "Hostel does not exist"}, status=400)
        except TooSmallError as e:
            return JsonResponse({"error": str(e)})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=405)



@csrf_exempt
def create_review(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            student_id = data.get('student_id')
            hostel_id = data.get('hostel_id')
            comment = data.get('comment')
            rating = data.get('rating')
            parent_review_id = data.get('parent_id')
            student = get_object_or_404(Student, pk=student_id)
            hostel = get_object_or_404(Hostel, pk=hostel_id)

            parent_review = None

            if parent_review_id:
                parent_review = get_object_or_404(Review, pk=parent_review_id)
            
            review = Review(student=student, hostel=hostel, comment=comment, rating=rating, parent_review=parent_review)
            review.save()

            return JsonResponse({'message': 'Review created successfully', 'review_id': review.id, "success":True}, status=201)

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
        for hostel in hostels:
            first_image = HostelImages.objects.filter(hostel=hostel["id"]).first()
            image_url = first_image.image.url if first_image else None
            hostel["image"] = image_url
        return JsonResponse(list(hostels), safe=False) #safe=False allows non-dict objects to be serialized.
    return JsonResponse([], safe=False)

@csrf_exempt
def add_review(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            student_id = data.get("student_id")
            hostel_id = data.get("hostel_id")
            comment = data.get("comment","")
            rating = data.get("rating", 0)
            parent_id = data.get("parent_id")
            
            student = Student.objects.get(admission_number=student_id)
            hostel = Hostel.objects.get(pk=hostel_id)

            parent_review = None

            if parent_id:
                parent_review = get_object_or_404(Review, pk=parent_id)

            review = Review.objects.create(
                student=student,
                hostel=hostel,
                comment=comment,
                rating=rating,
                parent_review=parent_review
            )

            return JsonResponse({"message": "Review added Successfully", "review_id": review.id}, status=201)
        except Student.DoesNotExist:
            return JsonResponse({"error": "Student not found"}, status=400)
        except Hostel.DoesNotExist:
            return JsonResponse({"error": "Hostel not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def add_amenity(request, hostel_id, amenity):
    hostel = Hostel.objects.get(pk=hostel_id)
    myamenity = Amenities.objects.get(amenity=amenity)
    try:
        if HostelAmenities.objects.get(amenity=myamenity, hostel=hostel):
            pass
    except HostelAmenities.DoesNotExist:
        HostelAmenities.objects.create(amenity=myamenity, hostel=hostel)
    return JsonResponse({"success": True})

def delete_amenity(request, hostel_id, amenity):
    hostel = Hostel.objects.get(pk=hostel_id)
    myamenity = Amenities.objects.get(amenity=amenity)
    HostelAmenities.objects.get(hostel=hostel, amenity=myamenity).delete()
    return JsonResponse({"success": True})

@csrf_exempt    
def create_amenity(request, hostel_id):
    try:
        hostel = Hostel.objects.get(pk=hostel_id)
    except Hostel.DoesNotExist:
        return JsonResponse({"error": "Hostel not found"}, status=400)
    if request.method == "POST":
        try:
            data = json.loads(request.body) 
            amenity = data.get("amenity")
            myamenity, _ = Amenities.objects.get_or_create(amenity=amenity)
            HostelAmenities.objects.get_or_create(amenity=myamenity, hostel=hostel)
            return JsonResponse({"success": True})
        except Hostel.DoesNotExist:
            return JsonResponse({"error": "Hostel not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)

def get_booking_status(request, hostel_id, admin_number):
    """this will return the state of the hostel in terms of booking"""
    hostel = Hostel.objects.get(pk=hostel_id)
    student = Student.objects.get(pk=admin_number)
    book = Booking.objects.filter(hostel=hostel, student=student).last()
    if book:
        return JsonResponse({"status": book.status})
    else:
        return JsonResponse({"status": None})

def student_book_hostel(request, hostel_id, admin_number, book_status):
    """this will save the new book status of the student"""
    hostel = Hostel.objects.get(pk=hostel_id)
    student = Student.objects.get(pk=admin_number)
    book = Booking.objects.filter(hostel=hostel, student=student).last()
    if book == None or book_status == "Pending":
        mybook = Booking.objects.create(
            hostel=hostel, 
            student=student,
            status="Pending" 
        )
        mybook.save()

    elif book_status == "Cancel":
        book.status = "Cancel"
        book.save()
    return JsonResponse({"successfully": True})

def active_booking(request, hostel_id):
    hostel = Hostel.objects.get(pk=hostel_id)
    booked_people = []
    bookings = Booking.objects.filter(hostel=hostel).filter(Q(status="Pending") | Q (status="Accept"))
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
            "student": student,
        })
    return JsonResponse({"bookings": booked_people, "vacancies": hostel.available_rooms}, safe=False)
    
def download_active_student(request, hostel_id, status):
    hostel = Hostel.objects.get(pk=hostel_id)
    booked_people = []
    report_title = ""
    filename = f"{hostel.hostel_name}.pdf"
    if status == "Active":
        report_title = "Active Students"
        filename = f"booking_report_for_active_students_in_{hostel.hostel_name}.pdf"
        bookings = Booking.objects.filter(hostel=hostel).filter(Q(status="Pending") | Q (status="Accept"))
    elif status == "All":
        filename = f"booking_report_history_for_{hostel.hostel_name}.pdf"
        report_title = "Booking History"
        bookings = Booking.objects.filter(hostel=hostel)
    elif status == "Pending":
        filename = f"booking_report_for_pending_students_in_{hostel.hostel_name}.pdf"
        report_title = "Pending Bookings"
        bookings = Booking.objects.filter(hostel=hostel, status='Pending')
    elif status == "Accept":
        filename = f"booking_report_for_accepted_students_in_{hostel.hostel_name}.pdf"
        report_title = "Accepted Bookings"
        bookings = Booking.objects.filter(hostel=hostel, status="Accept")
    else:
        return JsonResponse({"error": "did not find a suitable title"}, status=404)
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
            "student": student,
        })
    logo_path = finders.find("images/e-hostel-logo.png")
    if logo_path:
        logo_path = os.path.join(settings.BASE_DIR, logo_path)
        letterhead_html = f"""
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="file://{logo_path}" alt="E-Hostel logo" style="max-width: 150px;"><br>
                <p>Phone: +254 114386583 | Email: shiberoderrickwakhu@gmail.com</p>
            </div>
        """
    else:
      letterhead_html = """
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #007bff;">E-Hostel</h2>
                <p>Phone: +254 114386583 | Email: shiberoderrickwakhu@gmail.com</p>
            </div>
        """
    context = {
        "bookings": booked_people,
        "hostel": hostel,
        "vacancies": hostel.available_rooms,
        "number_of_rooms": hostel.number_rooms,
        "landlord_name": hostel.owner.first_name+" "+hostel.owner.last_name,
        "landlord_email": hostel.owner.email,
        "letterhead": letterhead_html,
        "report_title": report_title
    }
    template = get_template("booking_report.html")
    html_string = template.render(context)
    html = HTML(string=html_string)
    css = CSS(string='''
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    ''')
    pdf_file = html.write_pdf(stylesheets=[css])
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename={filename}'

    return response

def my_admin(request):
    return render(request, "admin.html")





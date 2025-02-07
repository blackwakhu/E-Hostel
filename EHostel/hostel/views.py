from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "index.html")

def stud_login(request):
    return render(request, "student/login.html")


def stud_log(request, req_type):
    pass
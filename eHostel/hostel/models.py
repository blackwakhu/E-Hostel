from django.db import models

class Student(models.Model):
    admission_number = models.CharField(primary_key=True, max_length=15)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10)
    gender = models.CharField(max_length=1, null=True, blank=True)
    password = models.CharField(max_length=45, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class Owner(models.Model):
    owner_id_number = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=45)

class Hostel(models.Model):
    hostel_name = models.CharField(max_length=25)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    price_per_month = models.IntegerField()
    location = models.CharField(max_length=45)
    number_rooms = models.IntegerField(default=1, null=True, blank=True)
    room_type = models.CharField(max_length=45, default='Bedsitter')
    available_rooms = models.IntegerField(default=0)
    county = models.CharField(max_length=45, null=True, blank=True)
    town = models.CharField(max_length=45, null=True, blank=True)
    locality = models.CharField(max_length=45, null=True, blank=True)
    
    class Meta:
        unique_together = ('owner', 'hostel_name')

class HostelAmenities(models.Model):
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE)
    amenity = models.CharField(max_length=45, null=True, blank=True)

class HostelImages(models.Model):
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE)
    image = models.BinaryField(null=True, blank=True)

class Booking(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=45, default='Pending')
    payment_status = models.CharField(max_length=45, default='Pending')
    
    class Meta:
        unique_together = ('student', 'hostel', 'created_at')

class Review(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=45, primary_key=True)
    amount = models.CharField(max_length=45, null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True)

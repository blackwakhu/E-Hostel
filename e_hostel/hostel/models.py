from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class AdminUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("Username is required")
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class AdminUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    created = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    objects = AdminUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    groups = models.ManyToManyField(
        "auth.Group", related_name="admin_users", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="admin_users_permissions", blank=True
    )

    def __str__(self):
        return f"Admin {self.username}"

class OwnerManager(BaseUserManager):
    """ Custom manager for Owner model. """

    def create_user(self, owner_id_number, first_name, last_name, email, phone_number, password=None, **extra_fields):
        if not owner_id_number:
            raise ValueError("Owner ID is required")
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        owner = self.model(
            owner_id_number=owner_id_number,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            **extra_fields
        )
        owner.set_password(password)  # Hash password
        owner.save(using=self._db)
        return owner

    def create_superuser(self, owner_id_number, first_name, last_name, email, phone_number, password=None, **extra_fields):
        """ Create a superuser with admin privileges. """
        raise ValueError("Owners cannot be superusers!")

class Owner(AbstractBaseUser, PermissionsMixin):
    owner_id_number = models.IntegerField(primary_key=True, unique=True)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10, unique=True)
    created = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  
    is_superuser = models.BooleanField(default=False)  

    USERNAME_FIELD = 'owner_id_number'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'phone_number']

    # ✅ Avoid field conflicts
    groups = models.ManyToManyField(
        "auth.Group", related_name="owner_users", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="owner_users_permissions", blank=True
    )

    def __str__(self):
        return f"Owner {self.owner_id_number} - {self.first_name} {self.last_name}"



class StudentManager(BaseUserManager):
    """Custom manager to handle student creation properly."""

    def create_user(self, admission_number, first_name, last_name, email, phone_number, password=None, **extra_fields):
        if not admission_number:
            raise ValueError("Admission number is required")
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        student = self.model(
            admission_number=admission_number,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            **extra_fields
        )
        student.set_password(password)  # Hash password
        student.save(using=self._db)
        return student

    def create_superuser(self, admission_number, first_name, last_name, email, phone_number, password=None, **extra_fields):
        """ Create a superuser with admin privileges. """
        """ Prevent students from becoming superusers. """
        raise ValueError("Students cannot be superusers!")

class Student(AbstractBaseUser, PermissionsMixin):
    admission_number = models.CharField(primary_key=True, max_length=15, unique=True)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10)
    gender = models.CharField(max_length=1, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  
    is_superuser = models.BooleanField(default=False)  

    USERNAME_FIELD = 'admission_number'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'phone_number']

    # ✅ Avoid field conflicts
    groups = models.ManyToManyField(
        "auth.Group", related_name="student_users", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="student_users_permissions", blank=True
    )

    def __str__(self):
        return f"Student {self.admission_number} - {self.first_name} {self.last_name}"


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

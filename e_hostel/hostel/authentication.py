from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import AdminUser, Owner, Student  # Replace 'your_app' with your actual app name

class MultiUserAuthBackend(BaseBackend):
    """
    Custom authentication backend to support AdminUser, Owner, and Student.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Tries to authenticate a user by checking against AdminUser, Owner, and Student models.
        """
        # 🔹 First, check if the user is an AdminUser
        try:
            admin_user = AdminUser.objects.get(username=username)
            if admin_user and check_password(password, admin_user.password):
                return admin_user
        except AdminUser.DoesNotExist:
            pass

        # 🔹 Then, check if the user is an Owner (uses owner_id_number as username)
        try:
            owner = Owner.objects.get(owner_id_number=username)
            if owner and check_password(password, owner.password):
                return owner
        except Owner.DoesNotExist:
            pass

        # 🔹 Finally, check if the user is a Student (uses admission_number as username)
        try:
            student = Student.objects.get(admission_number=username)
            if student and check_password(password, student.password):
                return student
        except Student.DoesNotExist:
            pass

        # 🔹 If no match found, return None (authentication failed)
        return None

    def get_user(self, user_id):
        """
        Retrieve a user instance given their ID.
        """
        try:
            return AdminUser.objects.get(pk=user_id)
        except AdminUser.DoesNotExist:
            pass

        try:
            return Owner.objects.get(pk=user_id)
        except Owner.DoesNotExist:
            pass

        try:
            return Student.objects.get(pk=user_id)
        except Student.DoesNotExist:
            pass

        return None

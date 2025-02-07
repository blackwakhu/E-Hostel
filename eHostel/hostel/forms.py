from django import forms
from .models import *

class StudentSignUp(forms.Form):
    #admission_number = forms.CharField(max_length=15, label='Admission Number', required=True)
    first_name = forms.CharField(max_length=45, label='First Name', required=True)
    last_name = forms.CharField(max_length=45, label='Last Name', required=True)
    email = forms.EmailField(label='Email', required=True)
    phone_number = forms.CharField(max_length=10, label='Phone Number', required=True)
    gender = forms.ChoiceField(
        choices=[('M', 'Male'), ('F', 'Female')],
        widget=forms.RadioSelect,
        label="Gender (Optional)",
        required=False
    )
    # password = forms.CharField(widget=forms.PasswordInput, label='Password', required=True) # Don't include in standard form!

    # Example of adding custom validation (can be done in a ModelForm too, but shown here without)
    def clean_admission_number(self):
        admission_number = self.cleaned_data['admission_number']
        # Check if the admission number already exists (you'll need to import your Student model)
        from .models import Student  # Import inside the function to avoid circular imports
        if Student.objects.filter(admission_number=admission_number).exists():
            raise forms.ValidationError("This admission number is already taken.")
        return admission_number

    def clean_email(self):
        email = self.cleaned_data['email']
        from .models import Student
        if Student.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already taken.")
        return email

# Password change form (separate as before)
class PasswordChangeForm(forms.Form):
    new_password = forms.CharField(widget=forms.PasswordInput(), label="New Password", required=True)
    confirm_password = forms.CharField(widget=forms.PasswordInput(), label="Confirm Password", required=True)

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get("new_password")
        confirm_password = cleaned_data.get("confirm_password")

        if new_password and confirm_password:
            if new_password != confirm_password:
                raise forms.ValidationError("Passwords do not match")
        return cleaned_data

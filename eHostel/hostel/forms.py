from django import forms

class StudentSignUp(forms.Form):
    fname = forms.CharField(label="First Name", max_length=25)
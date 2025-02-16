from django.contrib import admin

# Register your models here.

from .models import * 

# class HostelImagesTabular(admin.TabularInline):
#     model = HostelImages
#     extra = 1

class HostelAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Hostel Information", {"fields": ["hostel_name", "owner"]}),
        ("Hostel Specification", {"fields": ["price_per_month", "room_type"]}),
        ("Hostel Rooms", {"fields": ["available_rooms", "number_rooms"]}),
        ("Hostel Location", {"fields": ["county", "town", "locality"]})
    ]

    list_display = ["hostel_name", "owner", "room_type", "available_rooms"]
    list_filter = ["owner", "room_type", "county", "town", "locality"]
    # inlines = [HostelImagesTabular]
    

class HostelInline(admin.TabularInline):
    model = Hostel
    extra = 2

class OwnerAdmin(admin.ModelAdmin):
    # fields = [ , "password"]
    fieldsets = [
        ("Personal Information", {"fields": ["username", "first_name", "last_name",]}),
        ("Security Information", {"fields": ["password"]}),
        ("Contact Details", {"fields": ["email", "phone_number"]})
        ]

    inlines = [HostelInline]

    list_display = ["username", "first_name", "last_name", "email"]
    list_filter = ["first_name", "last_name"]
    

admin.site.register(Student)
admin.site.register(Owner, OwnerAdmin)
admin.site.register(Hostel, HostelAdmin)
admin.site.register(HostelAmenities)
# admin.site.register(HostelImages)


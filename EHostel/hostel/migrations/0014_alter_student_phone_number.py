# Generated by Django 5.1.6 on 2025-03-02 17:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hostel", "0013_alter_owner_phone_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="student",
            name="phone_number",
            field=models.CharField(max_length=14),
        ),
    ]

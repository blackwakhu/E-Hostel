# Generated by Django 5.1.6 on 2025-03-02 17:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hostel", "0012_delete_message"),
    ]

    operations = [
        migrations.AlterField(
            model_name="owner",
            name="phone_number",
            field=models.CharField(max_length=14, unique=True),
        ),
    ]

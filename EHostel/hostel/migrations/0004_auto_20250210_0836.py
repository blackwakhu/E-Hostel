# Generated by Django 3.1.12 on 2025-02-10 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0003_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='password',
            field=models.CharField(max_length=255),
        ),
    ]

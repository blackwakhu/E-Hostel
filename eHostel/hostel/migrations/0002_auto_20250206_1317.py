# Generated by Django 3.1.12 on 2025-02-06 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='admission_number',
            field=models.CharField(max_length=15, primary_key=True, serialize=False),
        ),
    ]

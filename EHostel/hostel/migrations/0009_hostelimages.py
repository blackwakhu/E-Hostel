# Generated by Django 3.1.12 on 2025-02-16 10:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0008_delete_hostelimages'),
    ]

    operations = [
        migrations.CreateModel(
            name='HostelImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='hostel_images/')),
                ('hostel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostel.hostel')),
            ],
        ),
    ]

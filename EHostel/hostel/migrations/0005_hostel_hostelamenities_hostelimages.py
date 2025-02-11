# Generated by Django 3.1.12 on 2025-02-11 08:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0004_auto_20250210_0836'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hostel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostel_name', models.CharField(max_length=25)),
                ('price_per_month', models.IntegerField()),
                ('location', models.CharField(max_length=45)),
                ('number_rooms', models.IntegerField(blank=True, default=1, null=True)),
                ('room_type', models.CharField(default='Bedsitter', max_length=45)),
                ('available_rooms', models.IntegerField(default=0)),
                ('county', models.CharField(blank=True, max_length=45, null=True)),
                ('town', models.CharField(blank=True, max_length=45, null=True)),
                ('locality', models.CharField(blank=True, max_length=45, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostel.owner')),
            ],
            options={
                'unique_together': {('owner', 'hostel_name')},
            },
        ),
        migrations.CreateModel(
            name='HostelImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='hostel_images/')),
                ('hostel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostel.hostel')),
            ],
        ),
        migrations.CreateModel(
            name='HostelAmenities',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(blank=True, max_length=45, null=True)),
                ('hostel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostel.hostel')),
            ],
        ),
    ]

# Generated by Django 3.1.12 on 2025-02-18 08:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hostel', '0010_review_parent_review'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('receiver_owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to='hostel.owner')),
                ('receiver_student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to='hostel.student')),
                ('sender_owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='hostel.owner')),
                ('sender_student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='hostel.student')),
            ],
        ),
        migrations.RemoveField(
            model_name='booking',
            name='payment_status',
        ),
        migrations.DeleteModel(
            name='Payment',
        ),
    ]

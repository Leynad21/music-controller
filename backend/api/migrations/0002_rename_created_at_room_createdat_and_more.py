# Generated by Django 4.1.6 on 2023-03-31 05:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='created_at',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='room',
            old_name='guest_can_pause',
            new_name='guestCanPause',
        ),
        migrations.RenameField(
            model_name='room',
            old_name='votes_to_skip',
            new_name='votesToSkip',
        ),
    ]

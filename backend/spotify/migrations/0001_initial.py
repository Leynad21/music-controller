# Generated by Django 4.1.7 on 2023-07-16 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SpotifyToken",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("user", models.CharField(max_length=50, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("refresh_token", models.CharField(max_length=150)),
                ("access_token", models.CharField(max_length=150)),
                ("expires_in", models.DateTimeField()),
                ("token_type", models.CharField(max_length=50)),
            ],
        ),
    ]

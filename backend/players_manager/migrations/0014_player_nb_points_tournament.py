# Generated by Django 5.0.6 on 2024-05-22 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players_manager', '0013_alter_player_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='nb_points_tournament',
            field=models.IntegerField(default=0),
        ),
    ]

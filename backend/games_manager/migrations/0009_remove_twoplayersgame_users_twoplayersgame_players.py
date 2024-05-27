# Generated by Django 5.0.6 on 2024-05-27 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games_manager', '0008_remove_twoplayersgame_score_max_and_more'),
        ('players_manager', '0018_delete_friend'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='twoplayersgame',
            name='users',
        ),
        migrations.AddField(
            model_name='twoplayersgame',
            name='players',
            field=models.ManyToManyField(related_name='players', to='players_manager.player'),
        ),
    ]

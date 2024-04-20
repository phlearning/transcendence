# Generated by Django 5.0.3 on 2024-04-17 12:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players_manager', '0002_player_avatar_player_nb_games_2p_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accept', models.BooleanField(default=False)),
                ('player_initiated', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player_initiate', to='players_manager.player')),
                ('player_received', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player_receive', to='players_manager.player')),
            ],
        ),
    ]
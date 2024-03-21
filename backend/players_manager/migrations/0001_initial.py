# Generated by Django 5.0.3 on 2024-03-19 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('nickname', models.CharField(max_length=200)),
                ('nb_games_2p', models.IntegerField(default=0)),
                ('nb_games_2p_won', models.IntegerField(default=0)),
                ('nb_games_2p_lost', models.IntegerField(default=0)),
                ('score', models.IntegerField(default=0)),
                ('avatar', models.CharField(max_length=200)),
            ],
        ),
    ]
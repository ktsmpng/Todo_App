# Generated by Django 2.1 on 2019-01-10 16:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2019, 1, 10, 16, 7, 14, 889585)),
        ),
    ]

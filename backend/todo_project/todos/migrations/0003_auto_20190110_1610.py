# Generated by Django 2.1 on 2019-01-10 16:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_todo_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='date_created',
            field=models.DateTimeField(default=datetime.date(2019, 1, 10)),
        ),
    ]

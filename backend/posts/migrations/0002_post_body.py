# Generated by Django 5.0.7 on 2024-07-23 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='body',
            field=models.CharField(default='default body text', max_length=200),
        ),
    ]

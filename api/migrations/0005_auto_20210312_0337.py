# Generated by Django 3.1.7 on 2021-03-12 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210312_0216'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='task_name',
            new_name='item_name',
        ),
        migrations.RemoveField(
            model_name='task',
            name='file_name',
        ),
        migrations.AddField(
            model_name='task',
            name='item_type',
            field=models.CharField(choices=[('task', 'Task'), ('file', 'File')], default='task', max_length=10),
        ),
    ]
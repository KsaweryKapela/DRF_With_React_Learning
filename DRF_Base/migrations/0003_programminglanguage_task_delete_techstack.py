# Generated by Django 4.1 on 2022-08-30 22:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('DRF_Base', '0002_techstack_delete_item'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgrammingLanguage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('img_src', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=1000)),
                ('done', models.BooleanField()),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='DRF_Base.programminglanguage')),
            ],
        ),
        migrations.DeleteModel(
            name='TechStack',
        ),
    ]

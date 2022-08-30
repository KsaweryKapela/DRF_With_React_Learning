from django.db import models


class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=200)
    img_src = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Task(models.Model):
    language = models.ForeignKey(ProgrammingLanguage, related_name='tasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    done = models.BooleanField()

    def __str__(self):
        return self.name

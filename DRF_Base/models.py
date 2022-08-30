from django.db import models


class TechStack(models.Model):
    name = models.CharField(max_length=200)
    level = models.IntegerField()
    img_src = models.CharField(max_length=500)
    notes = models.CharField(max_length=500)

    def __str__(self):
        return self.name


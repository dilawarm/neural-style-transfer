from django.db import models

# Create your models here.
class Style(models.Model):
    name = models.CharField(max_length=100, default='')
    link = models.CharField(max_length=100, default='')

class Upload(models.Model):
    link = models.CharField(max_length=100, default='')
    image = models.ImageField(upload_to='upload_images')
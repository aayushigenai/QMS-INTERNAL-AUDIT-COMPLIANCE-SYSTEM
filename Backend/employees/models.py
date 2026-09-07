from django.db import models

# Create your models here.
class Employees(models.Model):
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=50)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    department=models.CharField(max_length=50)
    role=models.CharField(max_length=25)

    def __str__(self):
        return self.email
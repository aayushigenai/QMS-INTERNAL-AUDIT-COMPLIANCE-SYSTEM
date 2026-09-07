from rest_framework import serializers
from .models import Employees

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employees
        fields=[
            "id",
            "email",
            "first_name",
            "last_name",
            "department",
            "role",
        ]
from django.contrib.auth.hashers import check_password

from rest_framework.views import APIView
from .models import Employees
from .serializers import EmployeeSerializer
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class EmployeeListView(APIView):
    def get(self,request):
        employees=Employees.objects.all()
        serializer=EmployeeSerializer(employees,many=True)
        return Response(
            serializer.data,status=status.HTTP_200_OK
        )

class LoginView(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")
        if not email or not password:
            return Response(
                {
                    "message":"Email and Password are required!"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            employee=Employees.objects.get(email=email)
        except Employees.DoesNotExist:
            return Response(
                {
                    "message": "Invalid email or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
        if not check_password(password,employee.password):
            return Response(
                {
                    "message": "Invalid email or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer=EmployeeSerializer(employee)
        return Response(
            {
                "message": "Login successful",
                "employee": serializer.data
            },
            status=status.HTTP_200_OK
        )
            
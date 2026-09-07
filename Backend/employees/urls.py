from django.urls import path
from .views import EmployeeListView, LoginView
urlpatterns = [
    path("employees/",EmployeeListView.as_view(),name="Employees_list"),
    path("login/",LoginView.as_view())
]

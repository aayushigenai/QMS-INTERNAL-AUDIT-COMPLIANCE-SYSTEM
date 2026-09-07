import csv
import os

from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password

from employees.models import Employees


class Command(BaseCommand):

    help = "Import employees from CSV file"

    def handle(self, *args, **kwargs):

        file_path = os.path.join(
            os.getcwd(),
            "employees_100.csv"
        )

        with open(
            file_path,
            "r",
            newline="",
            encoding="utf-8"
        ) as file:

            reader = csv.DictReader(file)

            count = 0

            for row in reader:

                Employees.objects.create(
                    email=row["email"],
                    password=make_password(row["password"]),
                    first_name=row["first_name"],
                    last_name=row["last_name"],
                    department=row["department"],
                    role=row["role"],
                )

                count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{count} employees imported successfully!"
            )
        )
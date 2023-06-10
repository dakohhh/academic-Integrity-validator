from django.urls import path, include
from . import views



urlpatterns = [

    path("", views.join_assignment, name="join_assignment"),

    path("submit", views.submit_assignment, name="submit_assignment"),
    
]

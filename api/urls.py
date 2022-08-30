from django.urls import path
from . import views

urlpatterns = [
    path('get-tech-data/', views.get_tech_data),
    path('return-users-PL/', views.return_users_PL)
]
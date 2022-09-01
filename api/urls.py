from django.urls import path
from . import views

urlpatterns = [
    path('get-todos/', views.get_todos),
    path('return-users-PL/', views.return_users_PL)
]
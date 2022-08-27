from django.urls import path
from . import views

urlpatterns = [
    path('get-data', views.get_data),
    path('add/', views.add_item)
]

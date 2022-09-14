from django.contrib import admin
from django.urls import path, include
from DRF_Base import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="index"),
    path("register/", views.register_page, name="register"),
    path('login/', views.login_page),
    path('confirm-email/<str:code>/', views.confirm_email, name='confirm-email'),
    path('logout/', views.log_out),
    path('', include('api.urls'))
]

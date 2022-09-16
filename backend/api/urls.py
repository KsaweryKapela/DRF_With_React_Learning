from django.urls import path
from . import views

urlpatterns = [
    path('edit-todos/', views.edit_todos),
    path('return-users-tech/', views.return_users_tech),
    path('edit-tech/', views.edit_tech),
    path('register-user', views.register_user),
    path('login-user', views.login_user),
    path('user-state', views.user_state)
]

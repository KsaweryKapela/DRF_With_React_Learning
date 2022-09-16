from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import BadRequest
from django.http import HttpResponse
from django.shortcuts import render, redirect
from DRF_Base.models import User


@login_required(login_url='/login')
def index(request):
    if not request.user.is_validated:
        return HttpResponse('<h1>You must validate your email first!</h1>')

    current_username = request.user.username
    return render(request, 'index.html', {'user': current_username})


def register_page(request):
    return render(request, 'register.html', {})


def login_page(request):
    return render(request, 'login.html', {})


def confirm_email(request, code):
    if request.user.is_authenticated:
        if request.user.email_validation_code == code:
            request.user.is_validated = True
            request.user.save()
            return render(request, 'confirm_email.html')
        else:
            return HttpResponse('<h1> 404 not found </h1>')
    else:
        request.session['code'] = code
        return redirect('/login')


def log_out(request):
    logout(request)
    return redirect('/login')

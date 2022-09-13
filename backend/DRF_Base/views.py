from django.core.exceptions import BadRequest
from django.http import HttpResponse
from django.shortcuts import render
from DRF_Base.models import User


def index(request):
    return render(request, 'index.html', {})


def register_page(request):
    return render(request, 'register.html', {})


def confirm_email(request, code):
    print(code)
    print(User.objects.get(username='Ksaff').email_validation_code)
    if User.objects.filter(email_validation_code=code).exists():
        user = User.objects.get(email_validation_code=code)
        user.is_validated = True
        user.save()
        return render(request, 'confirm_email.html')
    else:
        return HttpResponse('<h1> 404 not found </h1>')

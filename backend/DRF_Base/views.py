from django.http import HttpResponse
from django.shortcuts import render


def register_page(request):
    return render(request, 'register.html', {})


def index(request):
    return render(request, 'index.html', {})

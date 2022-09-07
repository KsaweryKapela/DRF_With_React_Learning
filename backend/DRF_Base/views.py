from django.http import HttpResponse
from django.shortcuts import render


def register_page():
    return HttpResponse('x')


def index(request):
    return render(request, 'index.html', {})

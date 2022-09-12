import re
from django.http import HttpResponseRedirect
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TechStackSerializer, TaskSerializer
from DRF_Base.models import MyAccountManager, TechStack, Task, User


@api_view(['POST', 'DELETE', 'PATCH'])
def edit_todos(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response({"message": "The data was saved to the database"})

    if request.method == 'DELETE':
        data = JSONParser().parse(request)
        task = Task.objects.get(name=data['name'])
        task.delete()

    if request.method == 'PATCH':
        data = JSONParser().parse(request)

        task = Task.objects.get(name=data['name'])
        task.description = data['description']
        if data['new_name'] == '':
            task.delete()
        else:
            task.name = data['new_name']
            task.save()

    return Response({"message": "Fetch wasn't successful"})


@api_view(['POST', 'DELETE', 'PATCH'])
def edit_PL(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TechStackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

    if request.method == 'PATCH':
        data = JSONParser().parse(request)
        if data['name'].strip() in ['']:
            item = TechStack.objects.get(name=data['old_name'])
            item.delete()
        else:
            item = TechStack.objects.get(name=data['old_name'])
            item.name = data['name']
            item.save()

    return Response({"message": "The data was saved to the database"})


@api_view(['POST', 'GET'])
def return_users_PL(request):
    pl = TechStack.objects.all()
    serializer = TechStackSerializer(pl, many=True)

    return Response([serializer.data])


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        response_dict = {}
        users_credentials = JSONParser().parse(request)

        username_pattern = re.compile(r"^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
        password_pattern = re.compile(r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")
        email_pattern = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

        if users_credentials['username'] == '':
            response_dict['username'] = 'Username is required'

        elif len(User.objects.filter(username=users_credentials['username'])) != 0:
            response_dict['username'] = 'This username is already used.'

        elif not re.fullmatch(username_pattern, users_credentials['username']):
            response_dict['username'] = 'Invalid username'

        if users_credentials['email'] == '':
            response_dict['email'] = 'Email is required'

        elif len(User.objects.filter(email=users_credentials['email'])) != 0:
            response_dict['email'] = 'This email is already used.'

        elif not re.fullmatch(email_pattern, users_credentials['email']):
            response_dict['email'] = 'Invalid email'

        if users_credentials['password'] == '':
            response_dict['password'] = 'Password is required'

        elif not re.fullmatch(password_pattern, users_credentials['password']):
            response_dict['password'] = 'Invalid password. Must contain capital letter, a number and at least 8 ' \
                                        'characters '

        if users_credentials['password2'] == '':
            response_dict['password2'] = 'Confirmation password is required'

        elif users_credentials['password'] != users_credentials['password2']:
            response_dict['password2'] = 'Passwords do not match'

        if response_dict == {}:
            manager = MyAccountManager()
            manager.create_user(email=users_credentials['email'],
                                username=users_credentials['username'],
                                password=users_credentials['password'])
            response_dict['validated'] = True

        return Response(response_dict)

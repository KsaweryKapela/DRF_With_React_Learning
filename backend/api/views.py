from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TechStackSerializer, TaskSerializer
from DRF_Base.models import MyAccountManager, TechStack, Task, User
from DRF_Base.validators import UserRegistrationValidation, LoginUser


@api_view(['POST', 'DELETE', 'PATCH'])
def edit_todos(request):
    if request.method == 'POST':
        data = request.data

        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response({"message": "The data was saved to the database"})

    if request.method == 'DELETE':
        data = request.data

        task = Task.objects.get(name=data['name'])
        task.delete()

    if request.method == 'PATCH':
        data = request.data
        task = Task.objects.get(name=data['name'])
        task.description = data['description']
        if data['new_name'] == '':
            task.delete()
        else:
            task.name = data['new_name']
            task.save()

    return Response({"message": "Fetch wasn't successful"})


@api_view(['POST', 'DELETE', 'PATCH'])
def edit_tech(request):
    if request.method == 'POST':
        data = request.data
        if TechStack.objects.filter(name=data['name']).filter(user_id=request.user.id).exists():
            return Response({'error': 'this item already exists'})
        TechStack.objects.create(name=data['name'], user_id=request.user.id)

    if request.method == 'PATCH':
        data = request.data
        print(data)
        if data['name'].strip() in ['']:
            item = TechStack.objects.filter(name=data['old_name']).first()
            item.delete()
        else:
            item = TechStack.objects.get(name=data['old_name'])
            item.name = data['name']
            item.save()

    return Response({"message": "The data was saved to the database"})


@api_view(['POST', 'GET'])
def return_users_tech(request):
    pl = TechStack.objects.filter(user=request.user.id).all()
    serializer = TechStackSerializer(pl, many=True)
    return Response([serializer.data])


@api_view(['POST'])
def register_user(request):

    if request.method == 'POST':
        users_credentials = JSONParser().parse(request)

        validation = UserRegistrationValidation(users_credentials['username'],
                                                users_credentials['email'],
                                                users_credentials['password'],
                                                users_credentials['password2'])

        response_dict = validation.validate_and_register()

        if 'validated' in response_dict:

            login_class = LoginUser(users_credentials['email'], users_credentials['password'], request)
            login_class.login_user()

        return Response(response_dict)


@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        users_credentials = JSONParser().parse(request)
        login_class = LoginUser(users_credentials['email'], users_credentials['password'], request)
        if login_class.login_user():
            return Response({'logged': True})
        login_dict = login_class.check_errors()
        return Response(login_dict)


@api_view(['GET'])
def user_state(request):
    if request.method == 'GET':
        return Response({'is_logged': request.user.is_authenticated})

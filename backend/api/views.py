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
        if data['name'] in ['']:
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
        users_credentials = JSONParser().parse(request)
        if len(User.objects.filter(username=users_credentials['username'])) != 0:
            return Response({'response': 'The username is already taken'})

        elif len(User.objects.filter(email=users_credentials['email'])) != 0:
            return Response({'response': 'The email was already used!'})

        else:
            manager = MyAccountManager()
            manager.create_user(email=users_credentials['username'],
                                username=users_credentials['username'],
                                password=users_credentials['password'])

        return Response({'response': 'Wait for the email now.'})

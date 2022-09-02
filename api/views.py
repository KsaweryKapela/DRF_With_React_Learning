from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from DRF_Base.models import ProgrammingLanguage, Task
from .serializers import PL_serializer, tasks_serializer


@api_view(['POST', 'DELETE', 'PATCH'])
def edit_todos(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = tasks_serializer(data=data)
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
        task.name = data['new_name']
        task.save()

    return Response({"message": "Fetch wasn't successful"})


@api_view(['POST', 'DELETE', 'PATCH'])
def edit_PL(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PL_serializer(data=data)
        if serializer.is_valid():
            serializer.save()

    if request.method == 'PATCH':
        data = JSONParser().parse(request)
        if data['name'] == '':
            item = ProgrammingLanguage.objects.get(name=data['old_name'])
            item.delete()
        else:
            item = ProgrammingLanguage.objects.get(name=data['old_name'])
            item.name = data['name']
            item.save()




    return Response({"message": "The data was saved to the database"})


@api_view(['POST', 'GET'])
def return_users_PL(request):
    pl = ProgrammingLanguage.objects.all()
    serializer = PL_serializer(pl, many=True)

    task = Task.objects.all()
    serializer2 = tasks_serializer(task, many=True)

    return Response([serializer.data, serializer2.data])

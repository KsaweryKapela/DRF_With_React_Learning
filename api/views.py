import json

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from DRF_Base.models import ProgrammingLanguage
from .serializers import PL_serializer, tasks_serializer


@api_view(['POST'])
def get_todos(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = tasks_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response({"message": "The data was saved to the database"})

    # items = Item.objects.all()
    # serializer = ItemSerializer(items, many=True)
    return Response({"message": "Fetch wasn't successful"})


@api_view(['POST', 'GET'])
def return_users_PL(request):
    pl = ProgrammingLanguage.objects.all()
    serializer = PL_serializer(pl, many=True)
    return Response(serializer.data)

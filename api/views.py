import json

from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from DRF_Base.models import TechStack
from .serializers import ItemSerializer


@api_view(['GET', 'POST'])
def get_tech_data(request):
    if request.method == 'GET':

        serializer = ItemSerializer(data=request.GET)
        if serializer.is_valid():
            serializer.save()
        return Response({"message": "The data was saved to the database"})

    # items = Item.objects.all()
    # serializer = ItemSerializer(items, many=True)
    return Response({"message": "Fetch wasn't successful"})


@api_view(['POST', 'GET'])
def return_tech_data(request):
    tech_stacks = TechStack.objects.all()
    serializer = ItemSerializer(tech_stacks, many=True)
    print(serializer.data)

    # print(serializer.data)
    # data = json.dumps(serializer.data)
    # print(data)
    return Response({'message': 'Database data was sent to react'})

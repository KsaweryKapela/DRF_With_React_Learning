from rest_framework.response import Response
from rest_framework.decorators import api_view
from DRF_Base.models import Item
from .serializers import ItemSerializer


@api_view(['GET', 'POST'])
def get_data(request):
    if request.method == 'GET':
        print(request.GET['name'])
        print(request.GET['age'])
        print(request.GET['notes'])
        print(request.GET['img_src'])

    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response()

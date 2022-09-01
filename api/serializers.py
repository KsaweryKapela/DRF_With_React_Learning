from rest_framework import serializers
from DRF_Base.models import ProgrammingLanguage, Task


class PL_serializer(serializers.ModelSerializer):
    tasks = serializers.StringRelatedField(many=True)

    class Meta:
        model = ProgrammingLanguage
        fields = ['id', 'name', 'img_src', 'tasks']


class tasks_serializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'


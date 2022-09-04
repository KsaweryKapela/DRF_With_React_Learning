from rest_framework import serializers
from DRF_Base.models import ProgrammingLanguage, Task


class tasks_serializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'done', 'language']


class PL_serializer(serializers.ModelSerializer):
    tasks = tasks_serializer(many=True, read_only=True)

    class Meta:
        model = ProgrammingLanguage
        fields = ['id', 'name', 'img_src', 'tasks']

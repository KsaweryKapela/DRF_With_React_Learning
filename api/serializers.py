from rest_framework import serializers
from DRF_Base.models import TechStack, Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'done', 'language']


class TechStackSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = TechStack
        fields = ['id', 'name', 'img_src', 'tasks']

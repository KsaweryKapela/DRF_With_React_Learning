from rest_framework import serializers
from DRF_Base.models import ProgrammingLanguage


class ItemSerializer(serializers.ModelSerializer):
    tasks = serializers.StringRelatedField(many=True)

    class Meta:
        model = ProgrammingLanguage
        fields = ['id', 'name', 'img_src', 'tasks']

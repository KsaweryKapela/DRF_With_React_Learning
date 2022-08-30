from rest_framework import serializers
from DRF_Base.models import TechStack


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = '__all__'

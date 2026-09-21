from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "account_name", "account_type", "current_balance", "account_holder"]
        extra_kwargs = {"account_holder": {"read_only": True}}
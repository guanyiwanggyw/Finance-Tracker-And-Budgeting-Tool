from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "account_name", "opening_balance", "opening_date", "account_holder"]
        extra_kwargs = {"account_holder": {"read_only": True}}
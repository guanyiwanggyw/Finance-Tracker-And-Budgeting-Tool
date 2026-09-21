from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Account

class AccountListCreate(generics.ListCreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Overriding function to return accounts only made by the user
        """
        user = self.request.user
        return Account.objects.filter(account_holder=user)

    def perform_create(self, serializer):
        """
        Overriding method to automatically add account_holder
        """
        serializer.save(account_holder=self.request.user)

class AccountDelete(generics.DestroyAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return (
            Account.objects
            .filter(account_holder=user)
            .prefetch_related("incoming_transactions", "outgoing_transactions")
        )


class AccountDetail(generics.RetrieveAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(account_holder=user)
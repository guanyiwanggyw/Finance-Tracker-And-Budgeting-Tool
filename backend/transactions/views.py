from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import TransactionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Transaction

class TransactionListCreate(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Overriding function to return transactions only made by the user
        """
        user = self.request.user
        return Transaction.objects.filter(account_holder=user)

    def perform_create(self, serializer):
        """
        Overriding method to automatically add account_holder
        """
        serializer.save(account_holder=self.request.user)

class TransactionDelete(generics.DestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Overriding function to delete transactions only made by the user
        """
        user = self.request.user
        return Transaction.objects.filter(account_holder=user)

class TransactionDetail(generics.RetrieveAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(account_holder=user)
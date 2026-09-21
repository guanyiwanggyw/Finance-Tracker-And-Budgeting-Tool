from django.db import models
from django.db.models import Sum
from django.contrib.auth.models import User

class Account(models.Model):
    # Internal accounts refers to accounts the user has control over such as bank accounts and cash
    # External accounts refers to sources outwith the users control such as a store or workplace
    ACCOUNT_TYPES = [("Internal","Internal"), 
                     ("External", "External"),]
    account_name = models.CharField(max_length=100)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPES, default="Internal")
    account_holder = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="accounts" 
    )

    @property
    def current_balance(self):
        incoming = self.incoming_transactions.aggregate(
            total=Sum("amount")
        )["total"] or 0

        outgoing = self.outgoing_transactions.aggregate(
            total=Sum("amount")
        )["total"] or 0

        return incoming - outgoing
    
    class Meta:
        db_table = "api_account"
        constraints = [
            models.UniqueConstraint(
                fields=["account_name", "account_holder"],
                name="unique_account_name_per_holder"
                )
        ]
    def __str__(self):
        return self.account_name
from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    date = models.DateField((""), auto_now=False, auto_now_add=False)
    type = models.CharField(max_length=8) 
    amount = models.DecimalField(max_digits=11, decimal_places=2)
    category = models.CharField(max_length=20) 
    from_account = models.ForeignKey(
        "accounts.Account",
        on_delete=models.PROTECT,
        related_name="outgoing_transactions",
        null=True,
        blank=True,
    )
    to_account = models.ForeignKey(
        "accounts.Account",
        on_delete=models.PROTECT,
        related_name="incoming_transactions",
        null=True,
        blank=True,
    )
    note = models.CharField(max_length=100, blank=True, default="")
    account_holder =  models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="transactions" 
    )

    class Meta:
        db_table = "api_transaction"
        


from django.utils import timezone
from rest_framework import serializers
from accounts.models import Account
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    from_account_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
    )
    to_account_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = Transaction
        fields = [
            "id",
            "date",
            "type",
            "amount",
            "category",
            "from_account",
            "to_account",
            "from_account_name",
            "to_account_name",
            "note",
            "account_holder",
        ]
        extra_kwargs = {
            "account_holder": {"read_only": True},
            "from_account": {"required": False},
            "to_account": {"required": False},
        }

    def validate(self, attrs):
        transaction_type = attrs.get("type", "").lower()
        from_account = attrs.get("from_account")
        to_account = attrs.get("to_account")
        from_account_name = attrs.get("from_account_name", "").strip()
        to_account_name = attrs.get("to_account_name", "").strip()

        if transaction_type == "expense":
            if not from_account:
                raise serializers.ValidationError(
                    {"from_account": "Select an account."}
                )

            if not to_account and not to_account_name:
                raise serializers.ValidationError(
                    {"to_account_name": "Select or enter a destination."}
                )

            if from_account.account_type != "Internal":
                raise serializers.ValidationError(
                    {"from_account": "Expenses must come from an internal account."}
                )

        elif transaction_type == "income":
            if not to_account:
                raise serializers.ValidationError(
                    {"to_account": "Select an account."}
                )

            if not from_account and not from_account_name:
                raise serializers.ValidationError(
                    {"from_account_name": "Enter an income source."}
                )

        elif transaction_type == "transfer":
            if not from_account or not to_account:
                raise serializers.ValidationError(
                    "Transfers require both accounts."
                )

            if from_account == to_account:
                raise serializers.ValidationError(
                    "The accounts must be different."
                )

        else:
            raise serializers.ValidationError(
                {"type": "Invalid transaction type."}
            )

        return attrs

    def create(self, validated_data):
        account_holder = validated_data["account_holder"]

        from_account_name = validated_data.pop("from_account_name", "").strip()
        to_account_name = validated_data.pop("to_account_name", "").strip()

        transaction_type = validated_data["type"].lower()

        if transaction_type == "expense" and to_account_name:
            validated_data["to_account"] = self.get_or_create_external_account(
                to_account_name,
                account_holder,
            )

        if transaction_type == "income" and from_account_name:
            validated_data["from_account"] = self.get_or_create_external_account(
                from_account_name,
                account_holder,
            )

        return Transaction.objects.create(**validated_data)

    def get_or_create_external_account(self, name, user):
        account = Account.objects.filter(
            account_name=name,
            account_holder=user,
        ).first()

        if account:
            if account.account_type != "External":
                raise serializers.ValidationError(
                    f"{name} is not an external account."
                )
            return account

        return Account.objects.create(
            account_name=name,
            account_type="External",
            opening_balance=0,
            opening_date=timezone.localdate(),
            account_holder=user,
        )
from django.urls import path
from . import views

urlpatterns = [
    path("", views.AccountListCreate.as_view(), name="account-list"),
    path("delete/<int:pk>/", views.AccountDelete.as_view(), name="delete-account"),
    path("<int:pk>/", views.AccountDetail.as_view(), name="account-detail"),
]

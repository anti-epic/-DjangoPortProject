from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('/', index),
    path('create', index),
    path('join/1', index)
]

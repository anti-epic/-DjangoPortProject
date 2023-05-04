from django.shortcuts import render
from rest_framework import generics
from .serializers import FormSerializer
from .models import Form
# Create your views here.

class FormView(generics.ListAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

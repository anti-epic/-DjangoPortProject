from django.urls import path
from .views import FormView
app_name ="backend"
urlpatterns = [
    path('forms/', FormView.as_view())
]

from django.urls import path
from .views import FormView
app_name ="backend"
urlpatterns = [
    path('backend/forms/', FormView.as_view())
]

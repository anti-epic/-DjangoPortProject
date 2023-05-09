from django.urls import path

from .views import FrontendAppView
app_name ="backend"
urlpatterns = [
    path('', FrontendAppView.as_view()),

]

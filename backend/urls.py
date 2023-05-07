from django.urls import path
from .views import FormView, QuestionView, ChoiceView, PollView
app_name ="backend"
urlpatterns = [
    path('forms/', FormView.as_view()),
    path('question/', QuestionView.as_view()),
    path('choice/', ChoiceView.as_view()),
    path('polls/', PollView.as_view())
]

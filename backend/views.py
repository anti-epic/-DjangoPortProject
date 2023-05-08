from django.shortcuts import render
from rest_framework import generics
from .serializers import FormSerializer, QuestionSerializer,ChoiceSerializer, PollSerializer
from .models import Form, Choice , Question
from django.views.decorators.csrf import csrf_exempt

#building react views
from django.views.generic import TemplateView,  View
from django.http import JsonResponse
from django.conf import settings
from django.views.generic.edit import CreateView
from django.urls import path
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
import json

from django.views.decorators.csrf import ensure_csrf_cookie

class ReactAppView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["DEBUG"] = settings.DEBUG
        return context

application = WhiteNoise(get_wsgi_application())
application.add_files(settings.STATIC_ROOT, prefix=settings.STATIC_URL)

# urlpatterns += staticfiles_urlpatterns()
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += [path("", ReactAppView.as_view(), name="react_app")]


# Create your views here.

class FormView(generics.ListAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

class QuestionView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ChoiceView(generics.ListAPIView):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class PollView(generics.ListAPIView):
    print('test')
    serializer_class = PollSerializer
    def get_queryset(self):
        return Question.objects.prefetch_related('choice_set').all()



class AddPollView(View):
    def post(self, request, *args, **kwargs):
        print('here')
        data = json.loads(request.body)
        print(data)
        question_text = data['payload']['question_text']
        choice_texts = data['payload']['choices']
        print(choice_texts, question_text)

        # Create the question object
        question = Question.objects.create(question_text=question_text)
        print(question)

        # Create the choice objects and connect them to the question
        for choice_text in choice_texts:
            choice = Choice.objects.create(choice_text=choice_text, question=question)
        return JsonResponse({'status': 'success'})


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})

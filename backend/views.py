
from rest_framework import generics
from .serializers import FormSerializer, QuestionSerializer,ChoiceSerializer, PollSerializer
from .models import Form, Choice , Question
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.db.models import Q
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
import os
import logging
from django.contrib.auth import logout
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


def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email_or_username = data.get('emailOrUsername')
        password = data.get('password')
        # check if user exists
        try:
            user = User.objects.get(Q(email=email_or_username) | Q(username=email_or_username))
        except User.DoesNotExist:
            data = {'errors': {'credential': 'User does not exist'}}
            return JsonResponse(data, status=400)

        # authenticate user
        if user.check_password(password):
            # user is authenticated, login and redirect to home page
            auth_login(request, user)
            return JsonResponse({'email': user.email, 'username': user.username})
        else:
            data = JsonResponse({'errors': ['Invalid combination']}, status=400)
            return data

    # handle GET request
    return JsonResponse({'error': 'Invalid method'}, status=400)




@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # check if passwords match
        if password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match.'}, status=400)

        # # check if user with email or username already exists
        # if User.objects.filter(email=email).exists() or User.objects.filter(username=username).exists():
        #     return JsonResponse({'error': 'User with this email or username already exists.'}, status=400)
        try:
            print('in here')
            user = User.objects.create_user(username=username, email=email, password=password)
            print(user)
            user.save()
            return JsonResponse({'username': user.username, 'email': user.email})
        except IntegrityError as e:
            return JsonResponse({'error': 'User with this email or username already exists.'}, status=400)
    # handle GET request
    return JsonResponse({'error': 'Invalid method'}, status=400)




def logout_view(request):
    logout(request)
    return JsonResponse({'success': True})



class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )

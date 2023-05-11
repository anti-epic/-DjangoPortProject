
from rest_framework import generics

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



# Create your views here.


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

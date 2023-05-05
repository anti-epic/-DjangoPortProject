from django.shortcuts import render
from rest_framework import generics
from .serializers import FormSerializer
from .models import Form


#building react views
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from whitenoise import WhiteNoise
class ReactAppView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["DEBUG"] = settings.DEBUG
        return context

application = WhiteNoise(get_wsgi_application())
application.add_files(settings.STATIC_ROOT, prefix=settings.STATIC_URL)

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [path("", ReactAppView.as_view(), name="react_app")]


# Create your views here.

class FormView(generics.ListAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
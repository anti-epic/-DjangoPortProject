import os
import sys

# Add your project directory to the sys.path
project_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_dir)

# Set the environment variable to the name of your Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.py")

# Import the Django WSGI handler
from django.core.wsgi import get_wsgi_application

# Create a WSGI application object
application = get_wsgi_application()



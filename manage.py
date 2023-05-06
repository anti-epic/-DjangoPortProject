#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendSettings.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Add the following lines to add the collectstatic command
    if 'collectstatic' in sys.argv:
        from django.conf import settings
        settings.STATIC_ROOT = os.path.join(settings.BASE_DIR, 'staticfiles')

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

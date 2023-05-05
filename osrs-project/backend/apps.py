from django.apps import AppConfig

print('Loading backend.apps')

# class backendConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'backend'
class PollsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

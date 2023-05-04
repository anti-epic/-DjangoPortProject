from django.db import models
import string
import random
def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Form.objects.filter(id=code).count() == 0:
            break
        return code
# Create your models here.

class Form(models.Model):
    owner = models.CharField(max_length=50, unique=True)
    title = models.TextField(max_length=255, blank=False , default='')
    description = models.TextField(blank=False, default='')
    created_at = models.DateField(auto_now_add=True)

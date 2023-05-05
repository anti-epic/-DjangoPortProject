from django.db import models
import string
import random
import datetime
from django.utils import timezone
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


# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

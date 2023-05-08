from rest_framework import serializers
from .models import Form, Question, Choice

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ('id', 'owner', 'created_at')

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'choice_text', 'votes', 'selected']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class PollSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'pub_date', 'choices']

    def get_choices(self, obj):
        choices = obj.choice_set.all()
        return ChoiceSerializer(choices, many=True).data

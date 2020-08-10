from django.contrib import admin

from . models import Question, Trivia, Profile

# Register your models here.

admin.site.register(Profile)
admin.site.register(Question)
admin.site.register(Trivia)

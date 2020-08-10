from django.db import models
from django_mysql.models import ListTextField
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver




CATEGORY_CHOICES = (
    ('1', 'Sports'),
    ('2', 'Music'),
    ('3', 'Movies'),
    ('4', 'Pop Culture'),
    ('5', 'Animals'),
    ('6', 'History'),
    ('7', 'Computers')
)

TYPE_CHOICES = (
    ('1', 'Multiple Choice'),
    ('2', 'True/False')
)

"""
This model declares the Profile's for users
"""
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    score = models.IntegerField(default=0)
    rank = models.TextField(default='none')

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __str__(self):
        return self.user.username


"""
This model declares the Question's for the trivia game
"""
class Question(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(blank=True, max_length=200, default='empty')
    correct = models.CharField(default="correct", max_length=200)
    category = models.CharField(default="Pick one", max_length=50, choices=CATEGORY_CHOICES)
    type = models.CharField(default="Pick one", max_length=50, choices=TYPE_CHOICES)

    def __str__(self):
        return "Question " + str(self.id) + ": " + self.content


class Incorrect(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.TextField(default="empty")

    def __str__(self):
        return str(self.question)


"""
This model declares the Trivia Game.
"""
class Trivia(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    joinable = models.BooleanField(default=True)
    title = models.CharField(default="Title of Game", max_length=200)
    category = models.CharField(default="Pick one", max_length=50, choices=CATEGORY_CHOICES)
    type = models.CharField(default="Pick one", max_length=50, choices=TYPE_CHOICES)

    def __str__(self):
        return self.title

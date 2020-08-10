import random
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from . import models
from . import serializers
# from trivia.permissions import IsOwnerOrReadOnly
# from trivia.permissions import IsStaffOrTargetUser

"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the User model.
"""
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.User

    filter_backends = [filters.SearchFilter]
    search_fields = ['=username']



"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the Profile model.
"""
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#    ordering =
    filterset_fields = ['score', 'rank']
    search_fields = ['=user']


"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the Trivia Game model.
"""
class TriviaViewSet(viewsets.ModelViewSet):
    queryset = models.Trivia.objects.all()
    serializer_class = serializers.TriviaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['type', 'category']
    search_fields = ['=id', '=title']


"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the Question model.
"""
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['type', 'category']
    search_fields = ['=id', '=content']

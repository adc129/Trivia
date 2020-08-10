from django.contrib.auth import get_user_model

from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status

from .models import Profile, Trivia, Question

"""
Global variables and API client to use in tests.
"""
client = APIClient()
user_data = {'username': 'test_user', 'password': 'test_password123', 'email': 'test_email@test.com'}


"""
This class defines the test suite for the User API
"""
class UserTestCase(APITestCase):
    def test_create_user(self):
        """ Test user creation (no token) / Creates Profile on creation """
        url = '/api/auth/users/'
        response = self.client.post(url, user_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Profile.objects.count(), 1)
        self.assertEqual(Profile.objects.get().rank, 0)

    def test_token_rejection(self):
        """ Test bad user token rejection """
        url = '/api/auth/token/login/'
        response = self.client.post(url, user_data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_token_destroy(self):
        """ Test user token destruction """
        url = '/api/auth/token/logout/'
        # response = self.client.post(url, pass_data, format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete_user(self):
        """ Test user deletion (no token) """
        url = '/api/auth/users/me'
        password = {'password': 'test_password123'}
        response = self.client.delete(url, password, format='json')
        self.assertEqual(response.status_code, 301)

"""
This class defines the test suite for the Profile API
"""
#class ProfileTestCase(APITestCase):


"""
This class defines the test suite for the Trivia API
"""
class TriviaTestCase(APITestCase):
    def test_create_trivia(self):
        """ Test the api has Trivia creation capability (no token) """
        url = '/api/v1/trivia/'
        trivia_data = {"title": "test_fun_time", "category": "1", "type": "2"}
        response = self.client.post(
            url,
            trivia_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trivia.objects.count(), 1)
        self.assertEqual(Trivia.objects.get().title, 'test_fun_time')


    def test_create_questions(self):
        url = '/api/v1/question/'
        data = {"content": "This is a test?", "correct": "yes it is", "inccorect": "no it isnt", "category": "1", "type": "2"}
        response = self.client.post(
            url,
            data,
            format='json'
        )

        print('------------create question---------------------\n')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Question.objects.count(), 1)
        self.assertEqual(Question.objects.get().content, 'This is a test?')

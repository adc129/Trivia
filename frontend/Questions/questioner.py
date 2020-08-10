import requests
import json
import random
import threading
from urllib.parse import unquote

url = "https://opentdb.com/api.php?amount="

#   'Sports': "21", "Music": "12", "General": "9", "History": "23", "Movies": "11"
modes = ["21", "12", "9", "23", "11"]

choices = ["multiple", "boolean"]

#   amounts = ["100", "200", "300", "400", "500"]

question_array = set()
output_array = []

requests_counter = 1


def add_question():
	global question_array
	global requests_counter
	print("Current total: " + str(len(question_array)))
	print("requesting..." + str(requests_counter))
	requests_counter = requests_counter + 1
	request_url = "https://opentdb.com/api.php?amount=50&type=" + choices[0] + "&encode=url3986"
	#   request_url = "https://opentdb.com/api.php?amount=50&category=" + \
	#   random.choice(modes) +
	#   "&type=" + choices[0] + "&encode=url3986"
	#   request_url = "https://opentdb.com/api.php?amount=10&type=multiple"
	response = requests.get(request_url)
	json_response = response.json()
	results = json_response["results"]

	for question in results:
		question_array.add(json.dumps(question))

	if len(question_array) < 1200:
		time_requests()
	else:
		print("Got max!")
		format_output()


def time_requests():
	timer = threading.Timer(10.0, add_question)
	timer.start()


def format_output():
	pk_counter = 1
	global question_array
	global output_array
	non_pythonic_i = 1
	break_bracks = ","
	for question in question_array:
		question = json.loads(question)

		if non_pythonic_i < len(question_array):
			non_pythonic_i += 1
		else:
			break_bracks = ""

		formatted = '\n\t{\n\t\t"model": "api.Question",\n\t\t"pk": ' + str(
			pk_counter) + ',\n\t\t"fields": \n\t\t{\n\t\t\t"content": "' + question["question"] + \
			'",\n\t\t\t"correct": "' + question["correct_answer"] + '",\n\t\t\t"incorrect": ["' + \
			question["incorrect_answers"][0] + \
			'", "' + question["incorrect_answers"][1] + '", "' + \
			question["incorrect_answers"][2] + '"]\n\t\t}\n\t}' + break_bracks

		pk_counter += 1
		output_array.append(formatted)
	file = open("fixtures.json", "w")
	file.writelines("[")
	file.writelines(output_array)
	file.writelines("\n]")
	file.close()


add_question()

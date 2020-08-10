## Get started on our API
http://klingons.pythonanywhere.com/docs/

## Getting Started Locally 

This backend system is built with Django, Django-Rest-Framework, and Python

### Prerequisites

To run this server on your machine you will need to activate the env in this directory.
To do so you will need to install virtualenv.  See documentation to install pip and virtualenv to run the requirements.txt file

https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/


### Installing and Running

Once your environment is activate and you're in this directory you can run the server locally by

```
cd ./core
```

```
python3 manage.py makemigrations
```

```
python3 manage.py migrate
```

```
python3 manage.py test
```

```
python3 manage.py runserver
```

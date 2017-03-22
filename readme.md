# CanYouDo

## How To Run (*Notes for Max and Seb*):

This runs on a python flask server to manage the database... the majority of the interactivity is done on javascript in static/test.js and static/ajaxHandler.js

1. Ensure Python3 is installed - do that [here](https://www.python.org/downloads/)
2. You need to install virtualenv python package. A tutorial to do and use it is [here](http://docs.python-guide.org/en/latest/dev/virtualenvs/) but these are the steps to get it running for this project:
	1. In terminal, run `pip3 install virtualenv`
	2. Then cd into the project folder `cd /desktop/canyoudo` (or whatever the path is)
	3. `virtualenv -p /Library/Frameworks/Python.framework/Versions/3.6/bin/python3 venv` this creates your virtual environment using the python3 shell (so when you run python in the virtualenv, it is actually running python 3)
	4. `. venv/bin/activate` this activates the virtualenv. You should see a `(venv)` on the side of your terminal
	5. Run `pip3 install -r requirements.txt` to install all of the required packages
	6. Finally `python main.py` should run the server and you can view the site at: `http://0.0.0.0:8000`. You can stop the server with `control-c`

Also note: You can deactivate the virtual environment with `deactivate` (the `(venv)` should disappear)

# Can you do - a simple time collaboration app

from flask import Flask, render_template, request, jsonify
import models

app = Flask(__name__)
app.secret_key = 'alalalalala ohohohoh tom is such a great person!'

HOST = '0.0.0.0'
PORT = 8000
DEBUG = True

# --- DB Handling ---
@app.before_request
def before_request():
	# we might need to make an actual instance of db...
	models.db.connect()

@app.after_request
def after_request(response):
	models.db.close()
	return response

@app.route('/', methods=['GET', 'POST'])
def index():
	if request.method == 'POST':
		models.Meeting.create(
		    selectedDates = request.json['selectedDates'],
		    open_code = request.json['passcode'],
		    passcode = request.json['passcode'],
		    email = request.json['email'],
		    group_times = '',
		)
		print('---> New Meeting created for {} with times:\n---> {}'.format(request.json['email'], request.json['selectedDates']))

		return render_template('index.html')

	return render_template('index.html')


if __name__ == '__main__':
	models.init()
	app.run(host=HOST, port=PORT, debug=DEBUG)

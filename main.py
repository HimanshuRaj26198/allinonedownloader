# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request, send_from_directory, render_template
from download_scripts import DownloadYTVideo
from flask_cors import CORS
import os

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
def home():
	return render_template('index.html')	

@app.route('/downloadyoutubevideo', methods=['POST', 'GET'])
# ‘/’ URL is bound with hello_world() function.
def download_yt_video():
	try:
		print(request.json['url'])
		yturl=request.json["url"]
		return { "download_url": DownloadYTVideo(yturl)}
	except Exception as e:
		print("Error", e)




# main driver function
if __name__ == '__main__':

	# run() method of Flask class runs the application 
	# on the local development server.
	app.run(debug=False, host="0.0.0.0")

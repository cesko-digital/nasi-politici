#!/usr/bin/env python
from app import create_app
#from app.data.helper import Helper
from datetime import datetime
from app.data.views.view import View
import flask

import sys, os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname( __file__ ), 'venv/Lib/site-packages')))

from flask import request
app = create_app('config')
from flask_cors import CORS, cross_origin
CORS(app, resources={r"/*": {"origins": "http://www.hlidacstatu.cz*"}})

@app.after_request
def after_request(response):
    if request.referrer:
        ref = request.referrer.split('/')
        url = ref[0] + "//" + ref[2]
        response.headers['Access-Control-Allow-Origin'] = url
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, HEAD'
    return response

@app.route("/")
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"

@app.route('/articles/<int:politician_id>', methods=['GET'])
def articlesForPolitician(politician_id):
    return View.articlesForPolitician(politician_id)

@app.route('/articles', methods=['POST'])
def articlesForPoliticianByQuery():
    return View.articlesForPoliticianByQuery()

@app.route('/topics/<int:politician_id>', methods=['GET'])
def topicsForPoliticianById(politician_id):
    return View.topicsForPoliticianById(politician_id)

@app.route('/topics', methods=['POST'])
def topicsForPoliticianByQuery():
    return View.topicsForPoliticianByQuery()

@app.route('/topics', methods=['GET'])
def topics():
    return View.topics()

@app.route('/politicians', methods=['POST'])
def addPolitician():
    return View.addPolitician()

@app.route('/politicians', methods=['GET'])
def getPoliticians():
    return View.politicians()

if __name__ == '__main__':
    app.run(host=app.config['HOST'],
            port=app.config['PORT'],
            debug=app.config['DEBUG'])

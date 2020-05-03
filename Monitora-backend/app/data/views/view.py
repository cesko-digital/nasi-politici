from flask import Blueprint, request, jsonify, make_response
from sqlalchemy.sql.elements import and_, or_
from sqlalchemy import distinct
from app.data.models import db
from app.data.helper import Helper, remove_diacritic, is_about_politician, decimal_default, flatten
from flask_restful import Api, Resource
import requests
import unidecode
import unicodedata
from app.data.token import token_string

import json
from decimal import Decimal

stats = Blueprint('stats', __name__)
helper = Helper()
helper.load()

article_keys = ['id', 'source', 'title', 'url', 'published', 'shares', 'perex', 'text']
politician_keys = ['id', 'name','search_query', 'party']


class View(Resource):
    root = 'https://api.monitora.cz/transparency/'
    @staticmethod
    def politicians():
        response = requests.get(View.root + 'politicians/', headers={'Authorization': token_string})
        response.encoding = 'utf-8'
        data = [{key: item[key] for key in politician_keys} for item in response.json()]
        return json.dumps(data)

    @staticmethod
    def articlesForPolitician(id):
        response = requests.get(View.root + 'articles/' + str(id), headers={'Authorization': token_string}, params={"count": 100})
        #response.encoding = 'utf-8'
        data = [{key: item[key] for key in article_keys} for item in response.json()]
        topics = helper.process(' '.join([item["text"] for item in response.json()]))
        topic_map = {}
        for index, item in enumerate(data):
            data[index]['perex'] = str(item['perex'].replace("<span class=\"article-hl\">", "").replace("</span>","").replace("&quot;", "\\\""))
            for topic in topics:
                if topic['topic'] in item['text']:
                    if topic['topic'] not in topic_map:
                        topic_map[topic['topic']] = [item['id']]
                    else:
                        topic_map[topic['topic']].append(item['id'])
        return json.dumps({"articles": data, "topic_map": topic_map})

    @staticmethod
    def articlesForPoliticianByQuery():
        raw_dict = request.get_json(force=True)
        politician_dict = raw_dict['data']
        id = View.searchPoliticianByName(politician_dict["name"])
        if id is None:
            requests.post(View.root + 'politicians/',
                          json=politician_dict,
                          headers={'Authorization': token_string})
        id = View.searchPoliticianByName(politician_dict["name"])
        response = requests.get(View.root + 'articles/' + str(id), headers={'Authorization': token_string},
                                params={"count": 100})
        # response.encoding = 'utf-8'
        data = [{key: item[key] for key in article_keys} for item in response.json()]
        topics = helper.process(' '.join([item["text"] for item in response.json()]))
        topic_map = {}
        for index, item in enumerate(data):
            data[index]['perex'] = str(item['perex'].replace("<span class=\"article-hl\">", "").replace("</span>", "").replace("&quot;", "\\\""))
            for topic in topics:
                if topic['topic'] in item['text']:
                    if topic['topic'] not in topic_map:
                        topic_map[topic['topic']] = [item['id']]
                    else:
                        topic_map[topic['topic']].append(item['id'])
        return json.dumps({"articles": data, "topic_map": topic_map})


    @staticmethod
    def topics():
        pass

    @staticmethod
    def searchPoliticianByName(name):
        for pol in json.loads(View.politicians()):
            if name == pol["name"]:
                return pol["id"]

    @staticmethod
    def topicsForPoliticianByQuery():
        raw_dict = request.get_json(force=True)
        politician_dict = raw_dict['data']
        id = View.searchPoliticianByName(politician_dict["name"])
        if id is None:
            requests.post(View.root + 'politicians/',
                                 json=politician_dict,
                                 headers={'Authorization': token_string})
        id = View.searchPoliticianByName(politician_dict["name"])
        response = requests.get(View.root + 'articles/' + str(id), headers={'Authorization': token_string}, params={"count": 100})
        #response.encoding = 'utf-8'
        data = helper.process(' '.join([item["text"] for item in response.json()]))
        return json.dumps(data)


    @staticmethod
    def topicsForPoliticianById(id):
        response = requests.get(View.root + 'articles/' + str(id), headers={'Authorization': token_string}, params={"count": 100})
        #response.encoding = 'utf-8'
        data = helper.process(' '.join([item["text"] for item in response.json()]))
        return json.dumps(data)

    @staticmethod
    def addPolitician():
        raw_dict = request.get_json(force=True)
        politician_dict = raw_dict['data']
        response = requests.post(View.root + 'politicians/',
                                json={"name": "Martin Charvát", "party": "ODS"},
                                headers={'Authorization': token_string})
        return View.politicians()



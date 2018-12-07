from flask import Flask, jsonify, request, redirect
import requests
import json
from random import randint
from flask_cors import CORS
import db
import links

app = Flask(__name__)
CORS(app)

url_elements = ["cat", "dog", "blue", "nerd", "fun", "today", "kuchen", "hopfen", "bier", "code", "ball", "klettern", "skate", "shit"]

@app.route('/<url>', methods=["GET"])
def do_redirect(url):    
    target = db.get_target(url)
    db.update_url_stats(url)

    return redirect(target, code=302)

@app.route('/links', methods=["POST"])
def post_user():
    payload = request.get_json()
    target = payload['target']
    if target.find("http://") != 0 and target.find("https://") != 0:
        target = "http://" + target
    url = links.generate(target)
    link_count = db.set_target(url, target)

    return jsonify({"url": url, "linkCount": link_count}), 200

@app.route('/stats/<url>', methods=["GET"])
def get_url_stats(url):
    stats = db.get_url_stats(url)
    return jsonify(stats), 200

@app.route('/stats', methods=["GET"])
def get_stats():
    stats = db.get_link_count()
    return jsonify(stats), 200

def get_random_url():
    url = ""
    num_of_words = randint(2,4)
    repeat = True
    while repeat:
        for x in range (0, num_of_words):
            if x != 0:
                url = url + "-" + url_elements[randint(0, len(url_elements)-1)]
            if x == 0:
                url = url + url_elements[randint(0, len(url_elements)-1)]
        print(db.get_target(url))
        if db.get_target(url) == False:
            repeat = False

    return url

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
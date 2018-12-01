from flask import Flask, jsonify, request, redirect
import requests
import json
from random import randint
from flask_cors import CORS
import pickledb 

app = Flask(__name__)
CORS(app)

link_db = pickledb.load('links.db', False)
url_elements = ["cat", "dog", "blue", "nerd", "fun", "today", "kuchen", "hopfen", "bier", "code", "ball", "klettern", "skate", "shit"]
links = {}
stats_db = pickledb.load('stats.db', False)

@app.route('/<url>', methods=["GET"])
def do_redirect(url):    
    target = link_db.get(url)
    print(target)
    stats_db.set(url, stats_db.get(url)+1)
    stats_db.dump()

    target = links[url]

    return redirect(target, code=302)

@app.route('/links', methods=["POST"])
def post_user():
    payload = request.get_json()
    target = payload['target']
    if target.find("http://") != 0 and target.find("https://") != 0:
        target = "http://" + target
    url = get_random_url()
    link_db.set(url, target)
    stats_db.set(url, 0)
    link_db.dump()

    links[url] = target

    print(links)

    return jsonify(url), 200

@app.route('/stats/<url>', methods=["GET"])
def get_stats(url):
    stats = stats_db.get(url)
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
        print(link_db.get(url))
        if link_db.get(url) == False:
            repeat = False

    return url

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
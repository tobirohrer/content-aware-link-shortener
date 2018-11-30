from flask import Flask, jsonify, request, redirect
import requests
import json
from random import randint
from flask_cors import CORS
import pickledb 

app = Flask(__name__)
CORS(app)

db = pickledb.load('test.db', False)
link_elements = ["cat", "dog", "blue", "nerd", "fun", "today", "kuchen", "hopfen", "bier", "code", "ball", "klettern", "skate", "shit"]

@app.route('/<funny_link>', methods=["GET"])
def do_redirect(funny_link):    
    redirect_to = db.get(funny_link)
    return redirect(redirect_to, code=302)

@app.route('/links', methods=["POST"])
def post_user():
    payload = request.get_json()
    target = payload['target']
    if target.find("http://") != 0 and target.find("https://") != 0:
        target = "http://" + target
    url = get_random_url()
    db.set(url, target)
    db.dump()
    return jsonify(url), 200

def get_random_url():
    url = ""
    num_of_words = randint(2,5)

    for x in range (0, num_of_words):
        if x != 0:
            url = url + "-" + link_elements[randint(0, len(link_elements)-1)]
        if x == 0:
            url = url + link_elements[randint(0, len(link_elements)-1)]
    return url

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
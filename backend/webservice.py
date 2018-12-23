from flask import Flask, jsonify, request, redirect
import requests
import json
from flask_cors import CORS
import db
import links

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
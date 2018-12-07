import html2text
import requests
import json
import operator
from nltk.tokenize import word_tokenize 
from nltk.corpus import stopwords
import nltk
import db

SPECIAL_CHARS = {u'ä': 'ae', 
                 u'ü': 'ue', 
                 u'ß': 'ss', 
                 u'ö': 'oe'}

def generate(target):
    content = requests.get(target)
    text = html2text.html2text(content.text)

    preprocessed_tokens = preprocess(text)
    rated_tokens = rate(preprocessed_tokens)
    sorted_tokens = sorted(rated_tokens.items(), key=operator.itemgetter(1), reverse=True)
  
    url = find_url(sorted_tokens)

    return url


def preprocess(text):
    for special_char in SPECIAL_CHARS:
        text = text.replace(str(special_char), SPECIAL_CHARS[special_char])

    nltk_tokens = word_tokenize(text)

    custom_stopwords = set({'http', 'https', 'and', 'jpg', 'mehr', 'fuer', 'gif', 'der', 'die', 'das', 'wir', 'ihr', 'sie', 'es', 'und', 'in', 'den'})
    merged_stopwords = custom_stopwords.union(stopwords.words('german'))
    merged_stopwords = merged_stopwords.union(stopwords.words('english'))

    cleared_tokens = []

    for nltk_token in nltk_tokens:
        if nltk_token.isalnum() and nltk_token.lower() not in merged_stopwords and len(nltk_token) > 2:
            cleared_tokens.append(nltk_token.lower())
    
    return cleared_tokens

def rate(tokens):
    hits = {}

    for token in tokens:
        if token in hits:
            hits[token] = hits[token] +1
        else:
            hits[token] = 1
    
    for hit in hits:
        hits[hit] = hits[hit] / (len(hit)/2)

    return hits

def find_url(sorted_tokens):
    i = 0
    j = 1

    while True:            
        url = sorted_tokens[i][0] + "-" + sorted_tokens[j][0]
        url_reverse =  sorted_tokens[j][0] + "-" + sorted_tokens[i][0]

        if db.get_target(url) == False:
            return url
        if db.get_target(url_reverse) == False:
            return url_reverse

        if j-i > 3:
            i = i + 1
        else: 
            j = j + 1
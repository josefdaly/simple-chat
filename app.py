import os
import json
import redis
import conf
from flask import Flask, request, send_from_directory, render_template
from datetime import datetime
app = Flask(__name__)

r = redis.Redis(host=conf.HOST, port=conf.REDIS_PORT)

@app.route('/react-test/<room_name>')
def react_chatroom(room_name):
    return render_template("index.html", flask_token="Hello   world")

@app.route('/<room_name>', methods=['GET'])
def chatroom(room_name):
    return send_from_directory('static', 'chat.html')

@app.route('/<room_name>/messages', methods=['GET', 'POST'])
def messages(room_name):
    room_key = 'msg-key-' + room_name
    messages = r.get(room_key) or json.dumps([])
    messages = json.loads(messages)
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        message = request.get_json()
        message['timestamp'] = datetime.now().isoformat()
        message['ip-address'] = request.environ['REMOTE_ADDR']
        messages.append(message)
        r.mset({room_key: json.dumps(messages)})

    return messages

if __name__ == '__main__':
    app.run(debug=True)

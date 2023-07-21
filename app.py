import os
import json
import redis
import conf
from flask import Flask, request, render_template
from datetime import datetime
import time
app = Flask(__name__)

r = redis.Redis(host=conf.HOST, port=conf.REDIS_PORT)

HELP_MESSAGE = """
Commands
    :usercount
        displays the number of active users
"""

@app.route('/<room_name>')
def react_chatroom(room_name):
    return render_template("index.html")

@app.route('/<room_name>/messages', methods=['GET', 'POST'])
def messages(room_name):
    room_key = 'msg-key-' + room_name
    user_room_key = 'users-key-' + room_name
    current_epoch = int(time.time())

    messages = r.get(room_key) or json.dumps([])
    messages = json.loads(messages)
    if request.method == 'GET':
        r.zadd(user_room_key, {request.environ['REMOTE_ADDR']: current_epoch})
    if request.method == 'POST':
        message = request.get_json()
        if message['message'] == ':usercount':
            user_count = r.zremrangebyscore(
                user_room_key,
                current_epoch - 5,
                current_epoch,
            )
            system_message = {
                'timestamp': datetime.now().isoformat(),
                'ip_address': 'system',
                'message': 'user count - ' + str(user_count),
            }
            messages.append(system_message)
        elif message['message'] == ':help':
            system_message = {
                'timestamp': datetime.now().isoformat(),
                'ip_address': 'system',
                'message': HELP_MESSAGE,
            }
            messages.append(system_message)
        else:
            message['timestamp'] = datetime.now().isoformat()
            message['ip_address'] = request.environ['REMOTE_ADDR']
            messages.append(message)
        r.mset({room_key: json.dumps(messages)})

    return messages

if __name__ == '__main__':
    app.run(debug=True)

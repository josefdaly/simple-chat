# Simple Chat

Simple chat server. To start navigate to root directory and run the following commands.
```
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python app.py
```
After this, you can create a chatroom by navigating to localhost:5000/:whatever.
To send a message, just type it out and hit enter. Open another page and navigate to the same URL and you will find the message is there as well.

## Routes
### /<room_name>
This will navigate to the front end and inform it to make requests to the room name specified in the URL.

### /<room_name>/messages - GET, POST
This endpoint will either GET messages namespaced in redis under the room_name or POST new messages under the namespace.

TODO: Add time filters so we're not fetching them all over and over again.

#### Example Post
```
const xhr = new XMLHttpRequest();
  xhr.open('POST', `${window.location.origin}${window.location.pathname}/messages`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ message: message }));
```

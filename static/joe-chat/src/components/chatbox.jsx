import { useState, useEffect } from 'react';

function ChatBox() {
    const [messages, setMessages] = useState(null);

    function getMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${window.location.origin}${window.location.pathname}/messages`)
        xhr.onload = function() {
            if (xhr.status === 200 ) {
                setMessages(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages();
        }, 1000);
    }, [])

    return (
      <div className="chatbox-container">
          {messages &&
              messages.map(message => {
                  return (
                      <p className='incoming-message'>{message.ip_address}: {message.message}</p>
                  )
              })
          }
      </div>
    )
}

export default ChatBox;

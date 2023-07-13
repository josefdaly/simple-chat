import { useState } from 'react';

function ChatInput() {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && message != '') {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${window.location.origin}${window.location.pathname}/messages`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({ message: message }));
            setMessage('');
        }
    }

    return (
        <div className='input-container'>
            <input type='text'
                autoFocus
                className='message-input'
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default ChatInput;

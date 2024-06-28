import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Message.css';

function MessagePage() {
  const { state } = useLocation();
  const { user } = state || {};
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    alert(`Message "${message}" sent to ${user.email}`);
    setMessage('');
  };

  return (
    <div className="message-page">
      <h1>Send a Message</h1>
      <div className="email-container">
        <p className="email-display">Email: {user?.email}</p>
        <textarea
          className="message-input"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message here"
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MessagePage;

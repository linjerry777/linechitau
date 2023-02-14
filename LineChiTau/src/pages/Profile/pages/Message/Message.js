import React, { useState } from 'react';

const Message = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { speaker: 'bot', message: 'Welcome to the chatbot!' },
  ]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setChatHistory([...chatHistory, { speaker: 'user', message: userInput }]);

    setUserInput('');
  };
  return (
    <div>
      <h1>非即時聊天室</h1>
      <ul>
        {chatHistory.map((chat, index) => (
          <li key={index} className="list-style-none">
            <b>{chat.speaker}:</b> {chat.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          value={userInput}
          onChange={handleUserInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Message;

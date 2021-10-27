import React from "react";
import { Link } from "react-router-dom";

const MessageList = ({ messages, title }) => {
  if (!messages.length) {
    return <h3>No Messages Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {messages &&
        messages.map((message) => (
          <div key={message._id} className="card mb-3">
            <p className="card-header">
              {message.username} message on {message.createdAt}
            </p>
            <div className="card-body">
              <p>{message.messageText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;

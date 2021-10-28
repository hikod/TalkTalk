import React, { useEffect, useState } from "react";
import "./Messages.css";

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user">{message.user.name}:</span>
            <span className="message">{message.value}</span>
            <span className="date">
              {new Date(message.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
}

import Avatar from "./ProPic";

export default ({ direction, text, author }) => (
  <div
    style={{
      transform: direction === "incoming" && "scaleX(-1)"
    }}
  >
    <div className="flex justify-end my-4">
      <div className="flex items-end justify-end md:w-3/5 lg:2/5">
        <div className="mr-3">
          <div
            className="text-xs text-grey mb-1 mx-3"
            style={{
              transform: direction === "incoming" && "scaleX(-1)"
            }}
          >
            {author}
          </div>
          <div
            className={[
              "p-3 py-2 leading-normal text-sm",
              direction === "incoming"
                ? "bg-grey-lighter"
                : "gradient-primary text-white"
            ].join(" ")}
            style={{
              borderRadius: 10,
              transform: direction === "incoming" && "scaleX(-1)"
            }}
          >
            {text}
          </div>
        </div>
        <div className="mr-2">
          <Avatar
            initials={author}
            style={{
              transform: direction === "incoming" && "scaleX(-1)"
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
// CODE FROM https://github.com/jferrettiboke/react-chat-app/blob/master/client/components/TextMessage.js

export default Messages;

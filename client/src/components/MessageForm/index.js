import React, { useEffect, useState } from "react";
import "./MessageForm.css";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutation";
import { QUERY_MESSAGES, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import dateFormat from "../../utils/dateFormat";

// import Messages from "../Messages";
import io from "socket.io-client";
import useChat from "../../utils/socket";
// var socket = io("http://localhost:3001");

const MessageForm = () => {
  const [content, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  // const [chat, setChat] = useState([]);
  const { messages, sendMessage } = useChat();

  const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      try {
        // update message array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { messages } = cache.readQuery({ query: QUERY_MESSAGES });
        cache.writeQuery({
          query: QUERY_MESSAGES,
          data: { messages: [addMessage, ...messages] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, messages: [...me.messages, addMessage] } },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // await addMessage({
      //   variables: { content },
      // });
      sendMessage(content, Auth.getProfile().data.username);
      io.emit("chat message", content);
      // clear form value
      setText("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="chat-room-container">
        <div className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <div>
                <li
                  key={i}
                  className={`message-item ${
                    message.ownedByCurrentUser
                      ? "my-message"
                      : "received-message"
                  }`}
                >
                  {message.username.toUpperCase()}: {message.body}
                  <p> Sent at {message.time}</p>
                </li>
              </div>
            ))}
          </ol>
        </div>
        <form
          className="flex-row justify-center justify-space-between-md align-stretch"
          onSubmit={handleFormSubmit}
        >
          <textarea
            placeholder="Here's a new message..."
            value={content}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          ></textarea>
          <button className="btn col-12 col-md-3" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;

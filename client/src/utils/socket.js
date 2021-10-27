import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat message"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3001";

const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL);

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log(message);
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  });

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody, username) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      username: username,
    });
  };

  return { messages, sendMessage };
};

export default useChat;

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.css";
import API from "../../api";

// socket.io server connection
const socket = io(API);

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState("You");

  // useEffect(() => {
  //   // Listen for new messages from the server
  //   socket.on("newMessage", (message) => {
  //     setChatMessages((prevMessages) => [...prevMessages, message]); // Add new message to chat history
  //   });

  //   // Cleanup when component unmounts
  //   return () => {
  //     socket.off("newMessage"); // Remove listener when component unmounts
  //   };
  // }, []);

  // // Handle sending message
  // const handleSendMessage = () => {
  //   if (!newMessage.trim()) return; // Do not send empty messages

  //   // Emit the message to the server
  //   socket.emit("sendMessage", {
  //     sender: "You",
  //     text: newMessage,
  //     timestamp: new Date(),
  //   });

  //   // Clear input field
  //   setNewMessage("");
  // };

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to server.");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server.");
  //     setError("Disconnected from server.");
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //   };
  // }, []);

  const handleTyping = () => {
    if (!isTyping) {
      socket.emit("typing", { user });
      setIsTyping(true);
    }
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(stopTyping, 1000);
  };

  // Emit stop typing event
  const stopTyping = () => {
    socket.emit("stopTyping", { user });
    setIsTyping(false);
  };
  const typingTimeout = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for typing events
    socket.on("userTyping", (data) => {
      setTypingUsers((prev) => [...prev, data.user]);
    });

    socket.on("usertopTyping", (data) => {
      setTypingUsers((prev) => prev.filter((user) => user !== data.user));
    });
    return () => {
      socket.off("newMessage");
      socket.off("userTyping");
      socket.off("userStopTyping");
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      sender: user,
      text: newMessage,
      timestamp: new Date(),
    });
    setNewMessage("");
    stopTyping(); // Ensure typing event stops when message is sent
  };
  localStorage.debug = "*";
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <div key={index} className="chat-message">
            <img
              src={message.avatarUrl}
              alt={`${message.sender}'s avatar`}
              className="avatar"
            />
            <strong>{message.sender}:</strong> {message.text}{" "}
            <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
            typing...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

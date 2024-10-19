import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../../api";

const socket = io(API);

const PrivateChat = () => {
  const [room, setRoom] = useState("defaultRoom");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { username: "Emmanuel", room });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [room]);

  const handleSendMessage = () => {
    socket.emit("sendRoomMessage", {
      room,
      message: { sender: "Emmanuel", text: message, timestamp: new Date() },
    });
    setMessage("");
  };
  return (
    <div>
      <div>
        <h2>Room: {room}</h2>

        <div>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}</strong>: {msg.text}{" "}
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </p>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>

        {/* Simple dropdown to switch rooms */}
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="defaultRoom">Default Room</option>
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
        </select>
      </div>
      );
    </div>
  );
};

export default PrivateChat;

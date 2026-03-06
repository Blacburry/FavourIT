"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatPage() {

  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    const userStr = localStorage.getItem("user");
    if (!userStr) return; // Wait until loaded on client

    const user = JSON.parse(userStr);
    
    // Sort the IDs alphabetically so both users end up in the exact same room ID
    // regardless of who initiated the chat!
    const newRoomId = [user._id, id].sort().join("-");
    setRoomId(newRoomId);

    socket.emit("joinRoom", newRoomId);

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };

  }, [id]);

  const sendMessage = () => {

    if (!message.trim() || !roomId) return;

    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);

    socket.emit("sendMessage", {
      roomId,
      sender: user._id,
      receiver: id,
      text: message
    });

    setMessage("");

  };

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">
        Chat
      </h1>

      <div className="border h-80 overflow-y-scroll p-4 mb-4">

        {messages.map((msg, i) => (
          <p key={msg._id || i}>{msg.text || msg}</p>
        ))}

      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-4 py-2"
      >
        Send
      </button>

    </div>
  );
}
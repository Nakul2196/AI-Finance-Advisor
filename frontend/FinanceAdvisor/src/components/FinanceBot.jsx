import React, { useState } from "react";
import axios from "axios";
import "./FinanceBot.css";
import { FaPaperPlane } from "react-icons/fa"; // Import send icon

const FinanceBot = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const userMessage = { sender: "user", text: message };
      setChats((prevChats) => [...prevChats, userMessage]);

      const res = await axios.post("http://localhost:8001/api/financebot/chat", { message });

      const botMessage = { sender: "bot", text: res.data.reply };
      setChats((prevChats) => [...prevChats, botMessage]);
    } catch (error) {
      setChats((prevChats) => [...prevChats, { sender: "bot", text: "Error fetching AI response." }]);
      console.error("Error:", error);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="finance-bot-container">
      <h2 className="finance-bot-title">AI Finance Advisor</h2>
      
      <div className="finance-bot-chatbox">
        {chats.map((chat, index) => (
          <div key={index} className={`finance-bot-message ${chat.sender}`}>
            {chat.text}
          </div>
        ))}
        {loading && <div className="finance-bot-message bot">Thinking...</div>}
      </div>

      <div className="finance-bot-inputbox">
        <textarea
          className="finance-bot-textarea"
          placeholder="Ask me anything about finance..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          
        />
        <button onClick={sendMessage} className="finance-bot-button" disabled={loading}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default FinanceBot;

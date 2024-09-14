import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import "./FishAi.css";

const FishAi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatbotRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && chat.length === 0) {
      const defaultMessage = { type: "bot", content: "Hello! How can I assist you today?" };
      setChat([defaultMessage]);
    }
  }, [isOpen, chat]);

  const handleClickOutside = (event) => {
    if (chatbotRef.current && !chatbotRef.current.contains(event.target) && 
    toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const userMessage = { type: "user", content: message };
    setChat((chatLog) => [...chatLog, userMessage]);
    setMessage("");
    setIsTyping(true);
    setTimeout(async () => {
        const botResponse = await getBotResponse(message);
        const botMessage = { type: "bot", content: botResponse };
        setChat((chatLog) => [...chatLog, botMessage]);
        setIsTyping(false);
      }, 2000);
  };

  const getBotResponse = async (question) => {
    try {
      const response = await fetch("https://fishaichat.azurewebsites.net/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "question": question }),
      });
      const data = await response.json();
      return data.answer;
    } catch (error) {
      return "Error retrieving response. Please try again.";
    }
  };

  return (
    <div className={`fishai-container ${isOpen ? 'open' : ''}`}>
      <button ref={toggleButtonRef} className="chatbot-toggle" onClick={toggleChatBot}>
        {isOpen ? "Close" : "Chat"}
      </button>

      {isOpen && (
        <div className="chatbot" ref={chatbotRef}>
        <div className="chatbot-header">
          <img src="/images/fishbookicon.png" alt="Logo Icon" className="nav-icon" />
            <h4>FishAI</h4>
        </div>
         <div className="chatbot-body">
            {chat.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            ))}

            {isTyping && (
                <div className="message bot typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FishAi;

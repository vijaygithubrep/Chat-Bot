// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import '../Component/styles.css';
import img from '../Image/chat-img.jpg';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:5000/api/chat', { query: input });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Error retrieving data. Please try again later.' };
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <div className="chatbot">
            <div className="chat-window">
                <h1 style={{textAlign:"center", color:"#8a2be2"}}> ChatBot</h1>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <img src={img} style={{height:'7vw', width:"7vw", marginLeft:"28vw", marginTop:"28px", background:"#f9f9f9"}}/>
            <p style={{marginLeft:"29vw", width:"68px",textAlign:"center",background:"gray",color:"white", height:"18px", border:"1px solid black", borderRadius:"14px"}}>Say Hi</p>
        </div>
    );
}

export default Chatbot;

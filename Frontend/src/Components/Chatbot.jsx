import React, { useState } from 'react';
import '../CSS/Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // {role: 'user'|'bot', text}

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [...m, { role: 'bot', text: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: 'bot', text: 'Error: ' + (data.error || 'no response') }]);
      }
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', text: 'Network error' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') send();
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">Chatbot</div>
      <div className="chatbot-window">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="chat-msg bot">...</div>}
      </div>
      <div className="chatbot-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} placeholder="Escribe un mensaje..." />
        <button onClick={send} disabled={loading}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;

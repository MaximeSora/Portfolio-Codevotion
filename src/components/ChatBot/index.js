import { useState, useRef, useEffect, useCallback } from 'react';
import './ChatBot.css';

const GREETING = "Hi! I'm Maxime's portfolio assistant. Ask me anything about his projects, skills, or experience.";
const MAX_MESSAGES = 15;
const MAX_INPUT = 500;

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const limitReached = userMessageCount >= MAX_MESSAGES;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || limitReached) return;

    const userMsg = { role: 'user', content: text.slice(0, MAX_INPUT) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Send only user/assistant messages (skip greeting which is local)
      const apiMessages = newMessages
        .filter((_, i) => i > 0) // skip local greeting
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.error || 'Une erreur est survenue.',
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connexion impossible. Contactez Maxime directement.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className={`chatbot__bubble ${open ? 'chatbot__bubble--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="chatbot__bubble-label">Ask Maxime's AI</span>
          </>
        )}
      </button>

      {open && (
        <div className="chatbot__panel" role="dialog" aria-label="Chat avec l'assistant de Maxime">
          <div className="chatbot__header">
            <div className="chatbot__header-info">
              <span className="chatbot__header-dot" />
              <span className="chatbot__header-title">Ask Maxime's AI</span>
            </div>
            <span className="chatbot__header-count">
              {userMessageCount}/{MAX_MESSAGES}
            </span>
          </div>

          <div className="chatbot__messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot__msg chatbot__msg--${msg.role}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chatbot__msg chatbot__msg--assistant chatbot__msg--loading">
                <span className="chatbot__typing">
                  <span /><span /><span />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {limitReached ? (
            <div className="chatbot__limit">
              Message limit reached. Contact Maxime at <a href="mailto:maxime.pocq@gmail.com">maxime.pocq@gmail.com</a>
            </div>
          ) : (
            <form className="chatbot__input-bar" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
              <input
                ref={inputRef}
                className="chatbot__input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Maxime..."
                maxLength={MAX_INPUT}
                disabled={loading}
                aria-label="Votre message"
              />
              <button
                className="chatbot__send"
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Envoyer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;

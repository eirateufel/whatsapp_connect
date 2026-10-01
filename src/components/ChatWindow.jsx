import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages }) {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const el = chatWindowRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;

  }, [messages]);

  return (
    <div ref={chatWindowRef} className="chat-window">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}
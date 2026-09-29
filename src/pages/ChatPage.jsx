import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

export default function ChatPage() {
  const [recipientPhone, setRecipientPhone] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!recipientPhone.trim()) return;
    setChatActive(true);
  };

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: 'me' },
    ]);
  };

  if (!chatActive) {
    return (
      <div className="chat-page create-chat-page">
        <h1>Новый чат</h1>
        <form className="create-chat-form" onSubmit={handleCreateChat}>
          <input
            type="tel"
            placeholder="Номер телефона получателя"
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            required
          />
          <button type="submit">Создать чат</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-page-active">
      <div className="chat-header">{recipientPhone}</div>
      <ChatWindow messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
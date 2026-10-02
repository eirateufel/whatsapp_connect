import { useState, useCallback, useMemo } from 'react';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { useAuth } from '../hooks/useAuth';
import { sendMessage, formatChatId } from '../api/messages';
import { useMessagePolling } from '../hooks/useMessagePolling';

export default function ChatPage() {
  const { apiUrl, idInstance, token } = useAuth();

  const [recipientPhone, setRecipientPhone] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const recipientChatId = useMemo(
    () => (recipientPhone ? formatChatId(recipientPhone) : null),
    [recipientPhone]
  );

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!recipientPhone.trim()) return;
    setChatActive(true);
  };

 const handleSend = async (text) => {
    const tempId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: tempId, text, sender: 'me', timestamp: Date.now() },
    ]);
    setError(null);

    try {
      await sendMessage({ apiUrl, idInstance, token, recipientPhone, text });
    } catch (err) {
      setError('Не удалось отправить сообщение. Проверьте данные авторизации.');
      console.error(err);
    }
  };

  const handleIncoming = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useMessagePolling({
    apiUrl,
    idInstance,
    token,
    recipientChatId,
    enabled: chatActive,
    onMessage: handleIncoming,
  });

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
      {error && <div className="chat-error">{error}</div>}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
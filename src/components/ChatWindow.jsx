import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}
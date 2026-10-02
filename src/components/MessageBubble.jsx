export default function MessageBubble({ text, sender, timestamp }) {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className={`message-bubble ${sender === 'me' ? 'message-out' : 'message-in'}`}>
      <span className="message-text">{text}</span>
      <span className="message-time">{time}</span>
    </div>
  );
}
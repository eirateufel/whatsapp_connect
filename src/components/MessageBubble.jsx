export default function MessageBubble({ text, sender }) {
  return (
    <div className={`message-bubble ${sender === 'me' ? 'message-out' : 'message-in'}`}>
      {text}
    </div>
  );
}
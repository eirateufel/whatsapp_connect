import { useRef, useState } from 'react';

const MIN_ROWS = 1;
const MAX_ROWS = 8;
const LINE_HEIGHT = 20; // px, должен совпадать со стилями в CSS
const VERTICAL_PADDING = 20; // px, должен совпадать со стилями в CSS

function getCSSNumber(varName) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return parseFloat(value); // 20px → 20, 1 → 1
}

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const resize = (el) => {
    el.style.height = 'auto';
    const maxHeight = LINE_HEIGHT * MAX_ROWS;
    const newHeight = Math.min(el.scrollHeight, maxHeight) - VERTICAL_PADDING;
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleChange = (e) => {
    setText(e.target.value);
    resize(e.target);
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = `${LINE_HEIGHT * MIN_ROWS}px`;
      textareaRef.current.style.overflowY = 'hidden';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        ref={textareaRef}
        className="message-input"
        rows={MIN_ROWS}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
      />
      <button className="send-button" onClick={handleSend} aria-label="Отправить">
        <img src="/favicon.svg" alt="" />
      </button>
    </div>
  );
}
import { greenApiRequest } from './client';

export function formatChatId(phone) {
  const digits = phone.replace(/\D/g, '');
  return `${digits}@c.us`;
}

export async function sendMessage({ apiUrl, idInstance, token, recipientPhone, text }) {
  const chatId = formatChatId(recipientPhone);

  console.log('[sendMessage] apiUrl:', apiUrl);
  console.log('[sendMessage] idInstance:', idInstance);
  console.log('[sendMessage] chatId:', chatId);
  console.log('[sendMessage] text:', text);

  return greenApiRequest({
    apiUrl,
    idInstance,
    token,
    method: 'sendMessage',
    body: {
      chatId,
      message: text,
    },
  });
}
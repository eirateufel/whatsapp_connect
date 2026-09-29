import { greenApiRequest } from './client';

export function formatChatId(phone) {
  const digits = phone.replace(/\D/g, '');
  return `${digits}@c.us`;
}

export async function sendMessage({ apiUrl, idInstance, token, recipientPhone, text }) {
  const chatId = formatChatId(recipientPhone);

  return greenApiRequest({
    apiUrl,
    idInstance,
    token,
    method: 'sendMessage',
    body: { chatId, message: text },
  });
}

export async function getNotification({ apiUrl, idInstance, token }) {
  return greenApiRequest({
    apiUrl,
    idInstance,
    token,
    method: 'receiveNotification',
  });
}

export async function deleteNotification({ apiUrl, idInstance, token, receiptId }) {
  return greenApiRequest({
    apiUrl,
    idInstance,
    token,
    method: 'deleteNotification',
    params: receiptId,
  });
}
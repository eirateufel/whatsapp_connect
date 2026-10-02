import { useEffect, useRef } from 'react';
import { getNotification, deleteNotification } from '../api/messages';

const POLL_INTERVAL = 3000;

export function useMessagePolling({ apiUrl, idInstance, token, recipientChatId, onMessage, enabled }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const poll = async () => {
      try {
        console.log('[poll] checking for new messages...');
        const notification = await getNotification({ apiUrl, idInstance, token });

        if (notification) {
          const { receiptId, body } = notification;
          console.log('[poll] notification:', notification);
          
          const messageData = body?.messageData;
          const senderData = body?.senderData;
          const senderChatId = senderData?.sender || senderData?.chatId;

          if (body?.typeWebhook === 'incomingMessageReceived' && messageData) {
            const text =
              messageData.textMessageData?.textMessage ||
              messageData.extendedTextMessageData?.text ||
              null;

            const isFromCurrentChat = senderChatId === recipientChatId;

            if (text && isFromCurrentChat) {
              console.log('[poll] new message for current chat:', text);
              onMessage({
                id: body.idMessage,
                text,
                sender: 'them',
                from: senderChatId,
                timestamp: body.timestamp ? body.timestamp * 1000 : Date.now(),
              });
            }
          }

          await deleteNotification({ apiUrl, idInstance, token, receiptId });
        }
      } catch (err) {
        console.error('[poll] error:', err);
      }

      if (!cancelled) {
        timerRef.current = setTimeout(poll, POLL_INTERVAL);
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, [apiUrl, idInstance, token, recipientChatId, enabled, onMessage]);
}
export async function greenApiRequest({ apiUrl, idInstance, token, method, body }) {
  const baseUrl = apiUrl.replace(/\/$/, '');
  const url = `${baseUrl}/waInstance${idInstance}/${method}/${token}`;

  console.log('[Green API] Request URL:', url);
  console.log('[Green API] Request body:', body);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log('[Green API] Response status:', response.status, response.statusText);

  const responseText = await response.text();
  console.log('[Green API] Response body (raw):', responseText);

  if (!response.ok) {
    throw new Error(`Green API error ${response.status}: ${responseText}`);
  }

  try {
    return JSON.parse(responseText);
  } catch {
    console.warn('[Green API] Response is not valid JSON');
    return null;
  }
}
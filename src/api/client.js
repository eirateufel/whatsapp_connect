const METHOD_VERBS = {
  sendMessage: 'POST',
  receiveNotification: 'GET',
  deleteNotification: 'DELETE',
};

export async function greenApiRequest({ apiUrl, idInstance, token, method, body, params }) {
  const baseUrl = apiUrl.replace(/\/$/, '');
  const httpVerb = METHOD_VERBS[method];

  if (!httpVerb) {
    throw new Error(`Unknown Green API method: ${method}`);
  }

  const pathSuffix = params ? `/${params}` : '';
  const url = `${baseUrl}/waInstance${idInstance}/${method}/${token}${pathSuffix}`;
  const hasBody = httpVerb === 'POST' && body !== undefined;

  const response = await fetch(url, {
    method: httpVerb,
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Green API error ${response.status}: ${responseText}`);
  }

  if (!responseText) return null;

  try {
    return JSON.parse(responseText);
  } catch {
    console.warn('[Green API] Response is not valid JSON');
    return null;
  }
}
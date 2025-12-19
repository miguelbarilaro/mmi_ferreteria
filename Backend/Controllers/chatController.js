const axios = require('axios');

async function handleChat(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Missing message in body' });
    const apiKey = process.env.OPENAI_API_KEY;

    // Development fallback: if no API key is configured or it's the placeholder,
    // return a simple rule-based/mock reply so the chatbot remains usable in dev.
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      const text = message.toLowerCase();
      let reply = "Lo siento, estoy en modo demo. Puedes configurar OPENAI_API_KEY en Backend/.env para respuestas reales.";
      if (text.includes('hola') || text.includes('buenas')) reply = '¡Hola! ¿En qué puedo ayudarte hoy?';
      else if (text.includes('precio') || text.includes('costo')) reply = 'Puedes consultar nuestros precios en la sección de catálogo o preguntarme por un producto específico.';
      else if (text.length < 20) reply = `Recibí: "${message}" — (modo demo)`;
      return res.json({ reply });
    }

    // Basic proxy to OpenAI Chat Completions API (gpt-3.5-turbo)
    const resp = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const assistant = resp.data?.choices?.[0]?.message?.content || '';
    return res.json({ reply: assistant });
  } catch (err) {
    console.error('chat error', err?.response?.data || err.message || err);

    // If the error is due to invalid/misconfigured API key, fall back to a
    // demo response so the chatbot remains usable in development.
  const status = err?.response?.status;
  const code = err?.response?.data?.error?.code || err?.response?.data?.code;
  const errType = err?.response?.data?.error?.type;
  if (status === 401 || code === 'invalid_api_key' || errType === 'invalid_request_error') {
      const message = req.body?.message || '';
      const text = message.toLowerCase();
      let reply = 'Modo demo: la clave de OpenAI parece inválida. Configure OPENAI_API_KEY para respuestas reales.';
      if (text.includes('hola') || text.includes('buenas')) reply = '¡Hola! (modo demo) ¿En qué puedo ayudarte?';
      return res.json({ reply });
    }

    return res.status(500).json({ error: 'Chat request failed', details: err?.response?.data || err.message });
  }
}

module.exports = { handleChat };

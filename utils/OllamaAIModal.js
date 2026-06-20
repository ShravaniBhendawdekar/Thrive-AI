// File: my-app/utils/OllamaAIModal.js

import fetch from 'node-fetch';

const BASE_URL = 'http://127.0.0.1:11434/api/generate';
const MODEL    = 'mistral';

export async function ollamaCompletion(prompt) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false       // ← disable streaming so we get one JSON reply
    })
  });

  if (!res.ok) {
    throw new Error(`Ollama error ${res.status}`);
  }

  const data = await res.json();
  // The API returns a single object with a "response" field
  return data.response;
}

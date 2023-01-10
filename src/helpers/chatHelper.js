import axios from 'axios'

export const chatWithGPT3 = async (prompt) => {
    const response = await axios('https://api.openai.com/v1/chat/gpt3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        'prompt': prompt,
        'model': 'text-davinci-002'
      })
    });
    return await response.json();
}
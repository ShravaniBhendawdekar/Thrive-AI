'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);      // full convo
  const [userMessage, setUserMessage] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    const trimmed = userMessage.trim();
    if (!trimmed) return;

    // 1️⃣ Add the user message to state
    const newHistory = [
      ...messages,
      { role: 'user', content: trimmed }
    ];
    setMessages(newHistory);
    setUserMessage('');
    setLoading(true);

    try {
      // 2️⃣ Send full history to your API route
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();

      // 3️⃣ Append assistant reply
      if (res.ok) {
        setMessages((prev) => [
          ...newHistory,
          { role: 'assistant', content: data.response }
        ]);
      } else {
        setMessages((prev) => [
          ...newHistory,
          { role: 'assistant', content: `Error: ${data.error}` }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...newHistory,
        { role: 'assistant', content: 'An unexpected error occurred.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format bullet points
  const formatBulletPoints = (text) => {
    const bulletPointPattern = /•/g;
    return text.split(bulletPointPattern).map((item, idx) => (
      <p key={idx} className="ml-4 text-left">
        {item.trim() && `• ${item.trim()}`}
      </p>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">🎯 Career Query Assistant</h1>

      {/* Conversation history */}
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-zinc-800 text-left text-justify'  // Left-aligned, justified for user messages
                : 'bg-green-900 text-left text-green-200 text-justify'  // Justified for assistant's response
            }`}
          >
            <strong className="block mb-1">
              {msg.role === 'user' ? 'You' : 'Assistant'}:
            </strong>
            <span className="whitespace-pre-wrap">
              {msg.role === 'assistant' ? formatBulletPoints(msg.content) : msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <Textarea
        placeholder="Ask me something career-related..."
        className="bg-zinc-900 border-zinc-700 text-white"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />

      {/* Send button */}
      <Button onClick={handleSendMessage} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </Button>
    </div>
  );
}

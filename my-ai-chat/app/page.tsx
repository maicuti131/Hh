"use client";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });
    const data = await response.json();
    setMessages([...newMessages, { role: "ai", content: data.text }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded ${m.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="border p-2 flex-1 rounded" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="bg-black text-white p-2 rounded" onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
}

import { useState } from "react";

function getLocalAnswer(prompt, content) {
  const text = content.trim();
  const words = text ? text.split(/\s+/) : [];
  const request = prompt.toLowerCase();

  if (request.includes("word count") || request.includes("words")) {
    return `This document has ${words.length} words.`;
  }

  if (request.includes("summarize") || request.includes("summary")) {
    if (!text) return "Add some text to the document first, then I can create a short preview.";
    const sentences = text.split(/(?<=[.!?])\s+/).slice(0, 3);
    return `Quick summary preview: ${sentences.join(" ")}${sentences.length < text.split(/(?<=[.!?])\s+/).length ? "…" : ""}`;
  }

  if (request.includes("outline")) {
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 5);
    return lines.length ? `Here are the first lines of your document:\n${lines.map((line) => `• ${line}`).join("\n")}` : "Add a few lines to your document and I can show them as an outline.";
  }

  return "I can do quick local checks for this document: try ‘word count’, ‘summarize’, or ‘outline’. General AI answers need an AI service connection.";
}

function AIChat({ document }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I can help with quick checks on your current document." },
  ]);
  const [input, setInput] = useState("");

  function sendMessage(event) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: prompt },
      { role: "assistant", text: getLocalAnswer(prompt, document.content) },
    ]);
    setInput("");
  }

  return (
    <section className="ai-chat" id="ai-chat" aria-label="Document assistant">
      <div className="chat-header">
        <h3>✨ Document Assistant</h3>
        <span>Local</span>
      </div>

      <div className="chat-body" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`ai-message ${message.role === "user" ? "user-message" : ""}`} key={`${message.role}-${index}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Try ‘word count’ or ‘summarize’..."
          aria-label="Message for document assistant"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit" aria-label="Send message">➤</button>
      </form>
    </section>
  );
}

export default AIChat;
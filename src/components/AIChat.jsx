function AIChat() {
  return (
    <div className="ai-chat">
      <div className="chat-header">
        <h3>✨ AI Assistant</h3>
        <span>Online</span>
      </div>

      <div className="chat-body">
        <div className="ai-message">
          Hi! I'm your AI assistant. Ask me anything about your documents!
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Ask something..." aria-label="Message for AI assistant" />
        <button type="button" aria-label="Send message">➤</button>
      </div>
    </div>
  );
}

export default AIChat;
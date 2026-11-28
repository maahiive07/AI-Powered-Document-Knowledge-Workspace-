function Editor({ document, saveStatus, onChange }) {
  return (
    <main className="editor">
      <div className="editor-header">
        <span>📄 My Documents / {document.title || "Untitled"}</span>
        <span aria-live="polite">{saveStatus}</span>
      </div>

      <div className="editor-content">
        <input
          type="text"
          placeholder="Untitled Document"
          className="document-title"
          value={document.title}
          onChange={(event) => onChange("title", event.target.value)}
          aria-label="Document title"
        />

        <textarea
          placeholder="Start writing your thoughts here..."
          className="document-text"
          value={document.content}
          onChange={(event) => onChange("content", event.target.value)}
          aria-label="Document content"
        />
      </div>
    </main>
  );
}

export default Editor;
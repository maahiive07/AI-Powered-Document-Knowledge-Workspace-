function Editor() {
  return (
    <main className="editor">
      <div className="editor-header">
        <span>📄 My Documents / Untitled</span>
        <span>● Saved</span>
      </div>

      <div className="editor-content">
        <input
          type="text"
          placeholder="Untitled Document"
          className="document-title"
        />

        <textarea
          placeholder="Start writing your thoughts here..."
          className="document-text"
        />
      </div>
    </main>
  );
}

export default Editor;
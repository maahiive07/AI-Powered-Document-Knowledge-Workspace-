import { useState, useEffect } from "react";

function Editor() {
  const savedData = JSON.parse(
    localStorage.getItem("knowverse-document") || "{}"
  );

  const [title, setTitle] = useState(
    savedData.title || ""
  );

  const [content, setContent] = useState(
    savedData.content || ""
  );

  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    setSaveStatus("Saving...");

    const timer = setTimeout(() => {
      localStorage.setItem(
        "knowverse-document",
        JSON.stringify({
          title,
          content
        })
      );

      setSaveStatus("Saved ✓");
    }, 600);

    return () => clearTimeout(timer);

  }, [title, content]);

  return (
    <main className="editor">

      <div className="editor-header">
        <span>📄 My Documents / Untitled</span>
        <span>{saveStatus}</span>
      </div>

      <div className="editor-content">

        <input
          type="text"
          placeholder="Untitled Document"
          className="document-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Start writing your thoughts here..."
          className="document-text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

      </div>

    </main>
  );
}

export default Editor;
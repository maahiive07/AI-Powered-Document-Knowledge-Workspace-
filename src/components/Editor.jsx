import { useEffect, useState } from "react";

const STORAGE_KEY = "knowverse-document";
const EMPTY_DOCUMENT = { title: "", content: "" };

function loadDocument() {
  try {
    const storedData = window.localStorage.getItem(STORAGE_KEY);
    if (!storedData) return EMPTY_DOCUMENT;

    const parsedData = JSON.parse(storedData);
    return {
      title: typeof parsedData.title === "string" ? parsedData.title : "",
      content: typeof parsedData.content === "string" ? parsedData.content : "",
    };
  } catch {
    return EMPTY_DOCUMENT;
  }
}

function Editor() {
  const [savedData] = useState(loadDocument);
  const [title, setTitle] = useState(savedData.title);
  const [content, setContent] = useState(savedData.content);
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ title, content }),
        );
        setSaveStatus("Saved ✓");
      } catch {
        setSaveStatus("Could not save");
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [title, content]);

  function updateTitle(event) {
    setTitle(event.target.value);
    setSaveStatus("Saving…");
  }

  function updateContent(event) {
    setContent(event.target.value);
    setSaveStatus("Saving…");
  }

  return (
    <main className="editor">
      <div className="editor-header">
        <span>📄 My Documents / {title || "Untitled"}</span>
        <span aria-live="polite">{saveStatus}</span>
      </div>

      <div className="editor-content">
        <input
          type="text"
          placeholder="Untitled Document"
          className="document-title"
          value={title}
          onChange={updateTitle}
          aria-label="Document title"
        />

        <textarea
          placeholder="Start writing your thoughts here..."
          className="document-text"
          value={content}
          onChange={updateContent}
          aria-label="Document content"
        />
      </div>
    </main>
  );
}

export default Editor;
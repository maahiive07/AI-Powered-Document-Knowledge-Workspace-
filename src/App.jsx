import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import AIChat from "./components/AIChat";
import "./App.css";

const STORAGE_KEY = "knowverse-workspace";
const LEGACY_STORAGE_KEY = "knowverse-document";

function createDocument(title = "", content = "") {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    title,
    content,
    favorite: false,
    updatedAt: Date.now(),
  };
}

function loadWorkspace() {
  try {
    const savedWorkspace = window.localStorage.getItem(STORAGE_KEY);
    if (savedWorkspace) {
      const parsed = JSON.parse(savedWorkspace);
      if (Array.isArray(parsed.documents) && parsed.documents.length > 0) {
        const documents = parsed.documents.map((document) => ({
          ...document,
          id: typeof document.id === "string" ? document.id : createDocument().id,
          title: typeof document.title === "string" ? document.title : "",
          content: typeof document.content === "string" ? document.content : "",
          favorite: Boolean(document.favorite),
          updatedAt: Number(document.updatedAt) || Date.now(),
        }));
        const activeId = documents.some((document) => document.id === parsed.activeId)
          ? parsed.activeId
          : documents[0].id;
        return { documents, activeId };
      }
    }

    const oldDocument = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (oldDocument) {
      const parsed = JSON.parse(oldDocument);
      const document = createDocument(
        typeof parsed.title === "string" ? parsed.title : "",
        typeof parsed.content === "string" ? parsed.content : "",
      );
      return { documents: [document], activeId: document.id };
    }
  } catch {
    // Start with a fresh document if browser storage is unavailable or invalid.
  }

  const document = createDocument();
  return { documents: [document], activeId: document.id };
}

function App() {
  const [workspace, setWorkspace] = useState(loadWorkspace);
  const [activeView, setActiveView] = useState("all");
  const [saveStatus, setSaveStatus] = useState("Saved");
  const activeDocument =
    workspace.documents.find((document) => document.id === workspace.activeId) ??
    workspace.documents[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
        setSaveStatus("Saved ✓");
      } catch {
        setSaveStatus("Could not save");
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [workspace]);

  function addDocument(title = "", content = "") {
    const document = createDocument(title, content);
    setWorkspace((current) => ({
      documents: [document, ...current.documents],
      activeId: document.id,
    }));
    setActiveView("all");
    setSaveStatus("Saving…");
  }

  function updateActiveDocument(field, value) {
    setWorkspace((current) => ({
      ...current,
      documents: current.documents.map((document) =>
        document.id === current.activeId
          ? { ...document, [field]: value, updatedAt: Date.now() }
          : document,
      ),
    }));
    setSaveStatus("Saving…");
  }

  function selectDocument(id) {
    setWorkspace((current) => ({
      ...current,
      activeId: id,
      documents: current.documents.map((document) =>
        document.id === id ? { ...document, updatedAt: Date.now() } : document,
      ),
    }));
    setActiveView("all");
    setSaveStatus("Saving…");
  }

  function toggleFavorite(id) {
    setWorkspace((current) => ({
      ...current,
      documents: current.documents.map((document) =>
        document.id === id
          ? { ...document, favorite: !document.favorite, updatedAt: Date.now() }
          : document,
      ),
    }));
    setSaveStatus("Saving…");
  }

  function deleteDocument(id) {
    if (!window.confirm("Delete this document?")) return;

    setWorkspace((current) => {
      const documents = current.documents.filter((document) => document.id !== id);
      const remaining = documents.length > 0 ? documents : [createDocument()];
      const activeId = current.activeId === id ? remaining[0].id : current.activeId;
      return { documents: remaining, activeId };
    });
    setSaveStatus("Saving…");
  }

  async function importFiles(files) {
    const supportedFiles = Array.from(files).filter((file) => /\.(txt|md)$/i.test(file.name));
    if (supportedFiles.length === 0) return;

    try {
      const imported = await Promise.all(
        supportedFiles.map(async (file) =>
          createDocument(file.name.replace(/\.(txt|md)$/i, ""), await file.text()),
        ),
      );
      setWorkspace((current) => ({
        documents: [...imported, ...current.documents],
        activeId: imported[0].id,
      }));
      setActiveView("all");
      setSaveStatus("Saving…");
    } catch {
      window.alert("Could not read that file. Please try a .txt or .md file.");
    }
  }

  function openAssistant() {
    document.getElementById("ai-chat")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app-container">
      <Sidebar
        documents={workspace.documents}
        activeId={activeDocument.id}
        activeView={activeView}
        onSelectView={setActiveView}
        onSelectDocument={selectDocument}
        onNewDocument={() => addDocument()}
        onToggleFavorite={toggleFavorite}
        onDeleteDocument={deleteDocument}
        onImportFiles={importFiles}
        onOpenAssistant={openAssistant}
      />

      <div className="main-content">
        <Navbar />

        <div className="workspace">
          <Editor
            document={activeDocument}
            saveStatus={saveStatus}
            onChange={updateActiveDocument}
          />
          <AIChat document={activeDocument} />
        </div>
      </div>
    </div>
  );
}

export default App;
import { useRef } from "react";

function Sidebar({
  documents,
  activeId,
  activeView,
  onSelectView,
  onSelectDocument,
  onNewDocument,
  onToggleFavorite,
  onDeleteDocument,
  onImportFiles,
  onOpenAssistant,
}) {
  const fileInput = useRef(null);
  const visibleDocuments = [...documents]
    .filter((document) => activeView !== "favorites" || document.favorite)
    .sort((first, second) => second.updatedAt - first.updatedAt);
  const listedDocuments = activeView === "recent" ? visibleDocuments.slice(0, 5) : visibleDocuments;

  function handleFileChange(event) {
    onImportFiles(event.target.files);
    event.target.value = "";
  }

  return (
    <aside className="sidebar">
      <h2 className="logo">Knowverse ✨</h2>
      <button className="new-doc" type="button" onClick={onNewDocument}>
        + New Document
      </button>

      <input
        ref={fileInput}
        className="file-input-hidden"
        type="file"
        accept=".txt,.md,text/plain,text/markdown"
        multiple
        onChange={handleFileChange}
        tabIndex={-1}
        aria-label="Import text or Markdown files"
      />

      <nav className="sidebar-menu" aria-label="Workspace navigation">
        <p>WORKSPACE</p>
        <button className={activeView === "all" ? "active" : ""} type="button" onClick={() => onSelectView("all")}>
          📄 My Documents
        </button>
        <button className={activeView === "favorites" ? "active" : ""} type="button" onClick={() => onSelectView("favorites")}>
          ⭐ Favourites
        </button>
        <button className={activeView === "recent" ? "active" : ""} type="button" onClick={() => onSelectView("recent")}>
          🕒 Recent
        </button>

        <p>TOOLS</p>
        <button type="button" onClick={onOpenAssistant}>🤖 AI Assistant</button>
        <button type="button" onClick={() => fileInput.current?.click()}>📁 Import Files</button>
      </nav>

      <div className="document-list" aria-label="Documents">
        {listedDocuments.length === 0 ? (
          <p className="empty-documents">No documents here yet.</p>
        ) : (
          listedDocuments.map((document) => (
            <div className={`document-row ${activeId === document.id ? "selected" : ""}`} key={document.id}>
              <button className="document-select" type="button" onClick={() => onSelectDocument(document.id)}>
                {document.title.trim() || "Untitled Document"}
              </button>
              <button
                className="document-action"
                type="button"
                onClick={() => onToggleFavorite(document.id)}
                aria-label={document.favorite ? "Remove from favourites" : "Add to favourites"}
                title={document.favorite ? "Remove from favourites" : "Add to favourites"}
              >
                {document.favorite ? "★" : "☆"}
              </button>
              <button
                className="document-action delete-document"
                type="button"
                onClick={() => onDeleteDocument(document.id)}
                aria-label={`Delete ${document.title || "Untitled Document"}`}
                title="Delete document"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
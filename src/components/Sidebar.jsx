function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Knowverse ✨</h2>

      <button className="new-doc">
        + New Document
      </button>

      <div className="sidebar-menu">
        <p>WORKSPACE</p>
        <button>📄 My Documents</button>
        <button>⭐ Favourites</button>
        <button>🕒 Recent</button>

        <p>TOOLS</p>
        <button>🤖 AI Assistant</button>
        <button>📁 My Files</button>
      </div>
    </aside>
  );
}

export default Sidebar;
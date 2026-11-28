function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Knowverse ✨</h2>

      <button className="new-doc" type="button">
        + New Document
      </button>

      <div className="sidebar-menu">
        <p>WORKSPACE</p>
        <button type="button">📄 My Documents</button>
        <button type="button">⭐ Favourites</button>
        <button type="button">🕒 Recent</button>

        <p>TOOLS</p>
        <button type="button">🤖 AI Assistant</button>
        <button type="button">📁 My Files</button>
      </div>
    </aside>
  );
}

export default Sidebar;
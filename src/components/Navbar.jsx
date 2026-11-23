function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h2>My Workspace</h2>
        <p>Welcome back! Ready to create something?</p>
      </div>

      <div className="navbar-right">
        <button>🔔</button>
        <div className="profile">M</div>
      </div>
    </nav>
  );
}

export default Navbar;
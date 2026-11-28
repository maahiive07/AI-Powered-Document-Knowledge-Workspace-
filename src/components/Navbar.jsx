function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h2>My Workspace</h2>
        <p>Welcome back! Ready to create something?</p>
      </div>

      <div className="navbar-right">
        <button type="button" aria-label="Notifications">🔔</button>
        <div className="profile" aria-label="User profile">M</div>
      </div>
    </nav>
  );
}

export default Navbar;
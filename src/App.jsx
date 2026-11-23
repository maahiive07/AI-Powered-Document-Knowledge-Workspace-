import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import AIChat from "./components/AIChat";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="workspace">
          <Editor />
          <AIChat />
        </div>
      </div>
    </div>
  );
}

export default App;
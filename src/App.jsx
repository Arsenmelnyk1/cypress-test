// App.jsx
import React from "react";
import UserForm from "./UserForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Memberstack User Management</h1>
        <p>A CRUD interface for managing user accounts</p>
      </header>

      <main>
        <UserForm />
      </main>

      <footer>
        <p>© 2025 Memberstack - Cypress Testing Assessment</p>
      </footer>
    </div>
  );
}

export default App;

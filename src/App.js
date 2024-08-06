import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./components/Routing/Routing";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routing />
      </Router>
    </AuthProvider>
  );
}

export default App;

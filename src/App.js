import "./App.css";
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from "./components/Routing/Routing";

function App() {
  return (
    <Router>
    <Routing />
  </Router>
  );
}

export default App;

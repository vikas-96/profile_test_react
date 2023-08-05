import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "../Pages/Front";
import Register from "../Pages/Front/Register";
import Dashboard from "../Pages/User";

export default function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}
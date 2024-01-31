// App.js or App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Destination from './pages/Destination';
import AuthForm from "./components/AuthForm/AuthForm";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInForm from "./components/AuthForm/LogInForm";


function App() {
  return (
    <Router>
      <div>
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/signUp" element={<AuthForm />} />
          <Route path="/logIn" element={<LogInForm />} />
          <Route path="/home" element={<HomePage />} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


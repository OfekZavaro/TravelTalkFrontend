import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Destination from "./pages/Destination";
import AuthForm from "./components/AuthForm/AuthForm";
import UploadPost from "./pages/UploadPost";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


function App() {
  return (
    <Router>
      <NavBar />
      <div>
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/uploadPost" element={<UploadPost />} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

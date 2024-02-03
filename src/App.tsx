import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Destination from "./pages/Destination";
import UploadPost from "./pages/UploadPost";
import ProfilePage from "./pages/ProfilePage";
import AuthForm from "./components/AuthForm/AuthForm";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for AuthForm without NavBar and Footer */}
        <Route path="/" element={<AuthForm />} />

        {/* Nested routes with Layout */}
        <Route element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="destination" element={<Destination />} />
          <Route path="uploadPost" element={<UploadPost />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Add other nested routes as needed */}
        </Route>
      </Routes>
        
    </Router>
  );
}

export default App;

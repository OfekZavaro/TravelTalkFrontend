// App.js or App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Destination from './pages/Destination';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination" element={<Destination/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


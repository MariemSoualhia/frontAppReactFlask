import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";

import "./App.css";
import Navigation from "./components/navigation/navigation";

import VideoStream from "./components/VideoStream/VideoStream";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<VideoStream />} />
          <Route path="/live" element={<VideoStream />} />
          <Route path="/search" element={<VideoStream />} />
          {/* Ajoutez d'autres routes ici */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

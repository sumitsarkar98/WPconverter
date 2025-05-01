import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Navbar from "./components/Navbar";
import Footer from "../src/components/Footer";
import WTPconvert from "./components/WTPconvert";
import PTWconvert from "./components/PTWconvert";
import PDFMerger from "./components/PDFmerge";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/word-to-pdf" element={<WTPconvert />} />
          <Route path="/pdf-to-word" element={<PTWconvert />} />
          <Route path="/merge-pdf" element={<PDFMerger />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

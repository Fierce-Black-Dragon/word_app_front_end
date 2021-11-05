import React from "react";
import "./App.css";

// import { useDispatch } from "react-redux";;
import { NavBar } from "./components/NavBar";
import { Homepage } from "./pages/Homepage";
import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";
import { WordDetailPage } from "./pages/WordDetailPage";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Routes>
          <Route path="/:id" element={<WordDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

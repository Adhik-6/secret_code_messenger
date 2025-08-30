import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Decode from "./Decode";
import "./index.css"; // your Tailwind / global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/decode" element={<Decode />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

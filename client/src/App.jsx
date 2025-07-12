import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import NewsApp from "./NewsApp"; // 👈 Import the new component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/news" element={<NewsApp />} /> {/* 👈 Add new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


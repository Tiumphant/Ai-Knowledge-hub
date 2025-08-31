import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DocForm from "./pages/DocForm.jsx";
import SearchPage from "./pages/SearchPage.jsx";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<DocForm />} />
        <Route path="/docs/:id" element={<DocForm />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
  );
}

// pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px", color: "#2c3e50" }}>🏠 Welcome</h1>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          This is the home page of your application.
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            to="/login"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            Register
          </Link>
          {/* <Link
            to="/dashboard"
            style={{
              padding: "10px",
              backgroundColor: "#17a2b8",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            Dashboard
          </Link> */}
        </nav>
      </div>
    </div>
  );
}

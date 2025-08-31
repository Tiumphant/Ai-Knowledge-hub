import { useEffect, useState } from "react";
import { getToken, isTokenValid, logout } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!isTokenValid(token)) {
      logout();
      return;
    }

    fetch("http://localhost:8080/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        logout();
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.firstName} {user.lastName}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Profile</h2>
        <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/docs/new"
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-xl shadow flex flex-col items-center justify-center"
        >
          <span className="text-lg font-semibold">➕ Add New Doc</span>
        </Link>
        <Link
          to="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl shadow flex flex-col items-center justify-center"
        >
          <span className="text-lg font-semibold">📑 View My Docs</span>
        </Link>
        <Link
          to="/search"
          className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-xl shadow flex flex-col items-center justify-center"
        >
          <span className="text-lg font-semibold">🔍 Search Docs</span>
        </Link>
      </div>
    </div>
  );
}

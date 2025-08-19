import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { logoutUser } from "../api";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // call backend logout
    } catch (err) {
      console.error("Logout error", err);
    }
    logout(); // clear context + localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        LeaveMgmt
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span>
              Hi, {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

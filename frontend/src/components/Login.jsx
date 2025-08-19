import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const userData = {
        id: res.data.id,
        name: res.data.name,
        role: res.data.role,
        token: res.data.token,
      };
      login(userData);

      if (res.data.role === "HR") navigate("/hr-dashboard");
      else navigate("/employee-dashboard");
    } catch (err) {
      alert("❌ Invalid login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/95 border border-green-600 shadow-[0_0_20px_rgba(0,255,0,0.4)] p-10 rounded-2xl space-y-6 max-w-sm w-full backdrop-blur-sm"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.6)] transition-all"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.6)] transition-all"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold px-4 py-3 w-full rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)] hover:shadow-[0_0_25px_rgba(0,255,0,0.9)] transition-all"
        >
          Login
        </button>
        <p className="text-green-200 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

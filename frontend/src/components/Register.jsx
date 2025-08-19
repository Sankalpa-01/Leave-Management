import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api.js";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
    department: "General",
    joiningDate: new Date().toISOString().slice(0, 10),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // This will now make a real network request to your backend
      await registerUser(form);
      alert("✅ Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      alert(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/95 border border-green-600 shadow-[0_0_20px_rgba(0,255,0,0.4)] p-10 rounded-2xl space-y-6 max-w-sm w-full backdrop-blur-sm"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">
          Create Account
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.6)] transition-all"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.6)] transition-all"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.6)] transition-all"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          disabled={isLoading}
        />

        <select
          className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.6)] transition-all appearance-none"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          disabled={isLoading}
        >
          <option value="Employee">Employee</option>
          <option value="HR">HR</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold px-4 py-3 w-full rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)] hover:shadow-[0_0_25px_rgba(0,255,0,0.9)] transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-green-200 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import EmployeeDashboard from "./components/EmployeeDashboard";
import HRDashboard from "./components/HRDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { user } = useContext(AuthContext) || {};

  return (
    <Router>
      {/* ✅ Navbar should only show when user is logged in */}
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={
                  user.role === "HR" ? "/hr-dashboard" : "/employee-dashboard"
                }
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" element={<Register />} />

        {/* Employee Dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <EmployeeDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* HR Dashboard */}
        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRDashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;

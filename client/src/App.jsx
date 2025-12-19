
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SetPassword from "./pages/setPassword"; // ✅ case matches filename
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

/* Layout wrapper to control Navbar visibility */
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/set-password";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Auth pages */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Invite flow */}
            <Route path="/set-password" element={<SetPassword />} />

            {/* Protected routes */}
            <Route
              path="/user"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

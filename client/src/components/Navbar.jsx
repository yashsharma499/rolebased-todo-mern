

import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  const dashboardRoute = user?.role === "admin" ? "/admin" : "/user";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to={dashboardRoute}
          className="text-lg font-semibold tracking-tight text-blue-600 hover:text-blue-700 transition cursor-pointer"
        >
          TodoFlow
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <div className="text-sm text-slate-500">
              Hello,&nbsp;
              <span className="font-medium text-slate-800">
                {user.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
    </nav>
  );
}

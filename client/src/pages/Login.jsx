


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      res.data.user.role === "admin"
        ? navigate("/admin")
        : navigate("/user");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white font-sans">

      {/* ================= LEFT — LOGIN ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20">
        <div className="w-full max-w-md space-y-10 animate-fadeInUp">

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome back{" "}
              <span className="inline-block animate-bounce-short">👋</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Stay focused with{" "}
              <span className="font-bold text-blue-600">TodoFlow</span>.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Email
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200
                             focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                             outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border border-gray-200
                             focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                             outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl
                         font-bold text-lg shadow-xl shadow-blue-600/30
                         active:scale-[0.97] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400">
            New here?{" "}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* ================= RIGHT — MODERN HERO ================= */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

        {/* Deep Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2BFF] via-[#153EFF] to-[#1B1F6A]" />

        {/* Artistic Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px]
                          bg-fuchsia-400/80 rounded-full blur-[80px]
                          mix-blend-screen animate-blobStrong" />

          <div className="absolute top-[25%] right-[10%] w-[460px] h-[460px]
                          bg-cyan-300/80 rounded-full blur-[90px]
                          mix-blend-screen animate-blobStrong animation-delay-2000" />

          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px]
                          bg-indigo-400/80 rounded-full blur-[100px]
                          mix-blend-screen animate-blobStrong animation-delay-4000" />
        </div>

        {/* Subtle Grain (design trick) */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-14 max-w-xl animate-fadeInUp">
          <div className="inline-flex p-6 rounded-3xl bg-white/15 backdrop-blur-xl mb-12 animate-float">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>

          <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Build better <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">
              habits.
            </span>
          </h2>

          <p className="text-blue-100 text-xl mb-10">
            A smarter way to plan, track, and complete your daily tasks.
          </p>

          <div className="flex items-center justify-center gap-3 text-white/70 text-xs font-bold tracking-widest">
            <Sparkles className="text-sky-300" size={14} />
            SIMPLE • FAST • POWERFUL
          </div>
        </div>
      </div>
    </div>
  );
}

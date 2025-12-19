// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { User, Mail, Lock, ArrowRight } from "lucide-react";
// import api from "../services/api";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await api.post("/auth/register", { name, email, password });

//       // ✅ Login page is "/"
//       navigate("/");
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//         "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex overflow-hidden bg-white">
//       {/* Left Side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-12 lg:px-24">
//         <div className="w-full max-w-md space-y-8">

//           {/* Header */}
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//               Create your account
//             </h1>
//             <p className="text-gray-500">
//               Start organizing your tasks with TodoFlow.
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Name</label>
//               <div className="relative mt-1.5">
//                 <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="text"
//                   required
//                   className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Email</label>
//               <div className="relative mt-1.5">
//                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="email"
//                   required
//                   className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
//                   placeholder="name@company.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Password</label>
//               <div className="relative mt-1.5">
//                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="password"
//                   required
//                   className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
//             >
//               {loading ? (
//                 "Creating account..."
//               ) : (
//                 <>
//                   Create Account <ArrowRight className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <Link
//               to="/"
//               className="font-semibold text-blue-600 hover:text-blue-700"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-600 to-indigo-800 items-center justify-center text-white">
//         <div className="max-w-md text-center px-8">
//           <h2 className="text-4xl font-bold mb-4">
//             Stay focused.<br />Get things done.
//           </h2>
//           <p className="text-blue-100 text-lg">
//             TodoFlow helps you plan smarter and achieve more every day.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/"); // login page
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white font-sans">

      {/* ================= LEFT — REGISTER ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20">
        <div className="w-full max-w-md space-y-10 animate-fadeInUp">

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Create account{" "}
              <span className="inline-block animate-bounce-short">✨</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Start organizing with{" "}
              <span className="font-bold text-blue-600">TodoFlow</span>.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Full Name
              </label>
              <div className="relative mt-2">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200
                             focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                             outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Email Address
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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200
                             focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                             outline-none transition-all"
                />
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
                  Create account
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/" className="font-bold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ================= RIGHT — HERO (SAME AS LOGIN) ================= */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2BFF] via-[#153EFF] to-[#1B1F6A]" />

        {/* Blobs */}
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

        {/* Content */}
        <div className="relative z-10 text-center px-14 max-w-xl animate-fadeInUp">
          <div className="inline-flex p-6 rounded-3xl bg-white/15 backdrop-blur-xl mb-12 animate-float">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>

          <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Get started <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">
              today.
            </span>
          </h2>

          <p className="text-blue-100 text-xl mb-10">
            Create your free account and boost your daily productivity.
          </p>

          <div className="flex items-center justify-center gap-3 text-white/70 text-xs font-bold tracking-widest">
            <Sparkles className="text-sky-300" size={14} />
            SIMPLE • FAST • SECURE
          </div>
        </div>
      </div>
    </div>
  );
}



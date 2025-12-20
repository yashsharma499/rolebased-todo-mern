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


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Lock,
//   ArrowRight,
//   CheckCircle2,
//   Sparkles,
// } from "lucide-react";
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
//       navigate("/"); // login page
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex overflow-hidden bg-white font-sans">

//       {/* ================= LEFT — REGISTER ================= */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20">
//         <div className="w-full max-w-md space-y-10 animate-fadeInUp">

//           <div className="space-y-3">
//             <h1 className="text-4xl font-extrabold text-gray-900">
//               Create account{" "}
//               <span className="inline-block animate-bounce-short">✨</span>
//             </h1>
//             <p className="text-gray-500 text-lg">
//               Start organizing with{" "}
//               <span className="font-bold text-blue-600">TodoFlow</span>.
//             </p>
//           </div>

//           {error && (
//             <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 animate-shake">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Name */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Full Name
//               </label>
//               <div className="relative mt-2">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="John Doe"
//                   className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200
//                              focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
//                              outline-none transition-all"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Email Address
//               </label>
//               <div className="relative mt-2">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@company.com"
//                   className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200
//                              focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
//                              outline-none transition-all"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Password
//               </label>
//               <div className="relative mt-2">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200
//                              focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
//                              outline-none transition-all"
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl
//                          font-bold text-lg shadow-xl shadow-blue-600/30
//                          active:scale-[0.97] transition-all flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               ) : (
//                 <>
//                   Create account
//                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </button>
//           </form>

//           <p className="text-center text-gray-400">
//             Already have an account?{" "}
//             <Link to="/" className="font-bold text-blue-600 hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* ================= RIGHT — HERO (SAME AS LOGIN) ================= */}
//       <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

//         {/* Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0A2BFF] via-[#153EFF] to-[#1B1F6A]" />

//         {/* Blobs */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-40 -left-40 w-[520px] h-[520px]
//                           bg-fuchsia-400/80 rounded-full blur-[80px]
//                           mix-blend-screen animate-blobStrong" />

//           <div className="absolute top-[25%] right-[10%] w-[460px] h-[460px]
//                           bg-cyan-300/80 rounded-full blur-[90px]
//                           mix-blend-screen animate-blobStrong animation-delay-2000" />

//           <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px]
//                           bg-indigo-400/80 rounded-full blur-[100px]
//                           mix-blend-screen animate-blobStrong animation-delay-4000" />
//         </div>

//         {/* Content */}
//         <div className="relative z-10 text-center px-14 max-w-xl animate-fadeInUp">
//           <div className="inline-flex p-6 rounded-3xl bg-white/15 backdrop-blur-xl mb-12 animate-float">
//             <CheckCircle2 className="w-16 h-16 text-white" />
//           </div>

//           <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
//             Get started <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">
//               today.
//             </span>
//           </h2>

//           <p className="text-blue-100 text-xl mb-10">
//             Create your free account and boost your daily productivity.
//           </p>

//           <div className="flex items-center justify-center gap-3 text-white/70 text-xs font-bold tracking-widest">
//             <Sparkles className="text-sky-300" size={14} />
//             SIMPLE • FAST • SECURE
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Lock,
//   ArrowRight,
//   CheckCircle2,
//   Sparkles,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import api from "../services/api";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // NEW
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // NEW
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // NEW
//   const [fieldErrors, setFieldErrors] = useState({ // NEW: Individual field errors
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const navigate = useNavigate();

//   // NEW: Email validation function
//   const validateEmail = (email) => {
//     const re = /^\S+@\S+\.\S+$/;
//     return re.test(email);
//   };

//   // NEW: Password strength validation
//   const validatePassword = (password) => {
//     const errors = [];
//     if (password.length < 8) errors.push("at least 8 characters");
//     if (!/(?=.*[a-z])/.test(password)) errors.push("one lowercase letter");
//     if (!/(?=.*[A-Z])/.test(password)) errors.push("one uppercase letter");
//     if (!/(?=.*\d)/.test(password)) errors.push("one number");
//     if (!/(?=.*[@$!%*?&])/.test(password)) errors.push("one special character");
//     return errors;
//   };

//   // NEW: Real-time validation
//   const validateField = (field, value) => {
//     const errors = { ...fieldErrors };
    
//     switch (field) {
//       case 'name':
//         if (!value.trim()) errors.name = "Name is required";
//         else if (value.trim().length < 2) errors.name = "Name must be at least 2 characters";
//         else errors.name = "";
//         break;
        
//       case 'email':
//         if (!value.trim()) errors.email = "Email is required";
//         else if (!validateEmail(value)) errors.email = "Please enter a valid email address";
//         else errors.email = "";
//         break;
        
//       case 'password':
//         if (!value) errors.password = "Password is required";
//         else {
//           const passwordErrors = validatePassword(value);
//           if (passwordErrors.length > 0) {
//             errors.password = `Password must contain: ${passwordErrors.join(", ")}`;
//           } else {
//             errors.password = "";
//           }
//         }
//         break;
        
//       case 'confirmPassword':
//         if (!value) errors.confirmPassword = "Please confirm your password";
//         else if (value !== password) errors.confirmPassword = "Passwords do not match";
//         else errors.confirmPassword = "";
//         break;
//     }
    
//     setFieldErrors(errors);
//   };

//   // NEW: Form validation before submit
//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;

//     // Validate name
//     if (!name.trim()) {
//       errors.name = "Name is required";
//       isValid = false;
//     } else if (name.trim().length < 2) {
//       errors.name = "Name must be at least 2 characters";
//       isValid = false;
//     }

//     // Validate email
//     if (!email.trim()) {
//       errors.email = "Email is required";
//       isValid = false;
//     } else if (!validateEmail(email)) {
//       errors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     // Validate password
//     if (!password) {
//       errors.password = "Password is required";
//       isValid = false;
//     } else {
//       const passwordErrors = validatePassword(password);
//       if (passwordErrors.length > 0) {
//         errors.password = `Password must contain: ${passwordErrors.join(", ")}`;
//         isValid = false;
//       }
//     }

//     // Validate confirm password
//     if (!confirmPassword) {
//       errors.confirmPassword = "Please confirm your password";
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//       isValid = false;
//     }

//     setFieldErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
    
//     // Validate form before submitting
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);

//     try {
//       await api.post("/auth/register", { name, email, password });
//       navigate("/"); // login page
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // NEW: Handle input changes with validation
//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     setName(value);
//     validateField('name', value);
//   };

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//     validateField('email', value);
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//     validateField('password', value);
//     // Also validate confirm password when password changes
//     if (confirmPassword) {
//       validateField('confirmPassword', confirmPassword);
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);
//     validateField('confirmPassword', value);
//   };

//   // NEW: Calculate password strength
//   const getPasswordStrength = () => {
//     if (!password) return 0;
//     let strength = 0;
//     if (password.length >= 8) strength += 20;
//     if (/[a-z]/.test(password)) strength += 20;
//     if (/[A-Z]/.test(password)) strength += 20;
//     if (/\d/.test(password)) strength += 20;
//     if (/[@$!%*?&]/.test(password)) strength += 20;
//     return strength;
//   };

//   const passwordStrength = getPasswordStrength();
//   const getStrengthColor = () => {
//     if (passwordStrength < 40) return "bg-red-500";
//     if (passwordStrength < 80) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   return (
//     <div className="h-screen w-screen flex overflow-hidden bg-white font-sans">
//       {/* ================= LEFT — REGISTER ================= */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20">
//         <div className="w-full max-w-md space-y-10 animate-fadeInUp">
//           <div className="space-y-3">
//             <h1 className="text-4xl font-extrabold text-gray-900">
//               Create account{" "}
//               <span className="inline-block animate-bounce-short">✨</span>
//             </h1>
//             <p className="text-gray-500 text-lg">
//               Start organizing with{" "}
//               <span className="font-bold text-blue-600">TodoFlow</span>.
//             </p>
//           </div>

//           {error && (
//             <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 animate-shake">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Full Name
//               </label>
//               <div className="relative mt-2">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={handleNameChange}
//                   placeholder="John Doe"
//                   className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border ${
//                     fieldErrors.name ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
//                   } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
//                 />
//               </div>
//               {fieldErrors.name && (
//                 <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.name}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Email Address
//               </label>
//               <div className="relative mt-2">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={handleEmailChange}
//                   placeholder="name@company.com"
//                   className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border ${
//                     fieldErrors.email ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
//                   } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
//                 />
//               </div>
//               {fieldErrors.email && (
//                 <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Password
//               </label>
//               <div className="relative mt-2">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={handlePasswordChange}
//                   placeholder="••••••••"
//                   className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border ${
//                     fieldErrors.password ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
//                   } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
              
//               {/* Password strength indicator */}
//               {password && (
//                 <div className="mt-2">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-xs text-gray-500">Password strength</span>
//                     <span className="text-xs font-medium text-gray-700">{passwordStrength}%</span>
//                   </div>
//                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className={`h-full ${getStrengthColor()} transition-all duration-300`}
//                       style={{ width: `${passwordStrength}%` }}
//                     />
//                   </div>
//                 </div>
//               )}
              
//               {fieldErrors.password && (
//                 <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.password}</p>
//               )}
              
//               {/* Password requirements */}
//               {password && (
//                 <ul className="text-xs text-gray-500 mt-2 space-y-1">
//                   <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
//                     <span className="mr-2">{password.length >= 8 ? '✓' : '○'}</span>
//                     At least 8 characters
//                   </li>
//                   <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : ''}`}>
//                     <span className="mr-2">{/[a-z]/.test(password) ? '✓' : '○'}</span>
//                     One lowercase letter
//                   </li>
//                   <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
//                     <span className="mr-2">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
//                     One uppercase letter
//                   </li>
//                   <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : ''}`}>
//                     <span className="mr-2">{/\d/.test(password) ? '✓' : '○'}</span>
//                     One number
//                   </li>
//                   <li className={`flex items-center ${/[@$!%*?&]/.test(password) ? 'text-green-600' : ''}`}>
//                     <span className="mr-2">{/[@$!%*?&]/.test(password) ? '✓' : '○'}</span>
//                     One special character (@$!%*?&)
//                   </li>
//                 </ul>
//               )}
//             </div>

//             {/* Confirm Password - NEW FIELD */}
//             <div>
//               <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
//                 Confirm Password
//               </label>
//               <div className="relative mt-2">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   value={confirmPassword}
//                   onChange={handleConfirmPasswordChange}
//                   placeholder="••••••••"
//                   className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border ${
//                     fieldErrors.confirmPassword ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
//                   } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {fieldErrors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.confirmPassword}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl
//                          font-bold text-lg shadow-xl shadow-blue-600/30
//                          active:scale-[0.97] transition-all flex items-center justify-center gap-2
//                          disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               ) : (
//                 <>
//                   Create account
//                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </button>
//           </form>

//           <p className="text-center text-gray-400">
//             Already have an account?{" "}
//             <Link to="/" className="font-bold text-blue-600 hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* ================= RIGHT — HERO (SAME AS LOGIN) ================= */}
//       <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
//         {/* Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0A2BFF] via-[#153EFF] to-[#1B1F6A]" />

//         {/* Blobs */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-40 -left-40 w-[520px] h-[520px]
//                           bg-fuchsia-400/80 rounded-full blur-[80px]
//                           mix-blend-screen animate-blobStrong" />

//           <div className="absolute top-[25%] right-[10%] w-[460px] h-[460px]
//                           bg-cyan-300/80 rounded-full blur-[90px]
//                           mix-blend-screen animate-blobStrong animation-delay-2000" />

//           <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px]
//                           bg-indigo-400/80 rounded-full blur-[100px]
//                           mix-blend-screen animate-blobStrong animation-delay-4000" />
//         </div>

//         {/* Content */}
//         <div className="relative z-10 text-center px-14 max-w-xl animate-fadeInUp">
//           <div className="inline-flex p-6 rounded-3xl bg-white/15 backdrop-blur-xl mb-12 animate-float">
//             <CheckCircle2 className="w-16 h-16 text-white" />
//           </div>

//           <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
//             Get started <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">
//               today.
//             </span>
//           </h2>

//           <p className="text-blue-100 text-xl mb-10">
//             Create your free account and boost your daily productivity.
//           </p>

//           <div className="flex items-center justify-center gap-3 text-white/70 text-xs font-bold tracking-widest">
//             <Sparkles className="text-sky-300" size={14} />
//             SIMPLE • FAST • SECURE
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordStrength, setPasswordStrength] = useState(0); // Separated state
  const [passwordRequirements, setPasswordRequirements] = useState({ // Separated state
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();

  // ✅ OPTIMIZED: Debounced validation with useCallback
  const validateField = useCallback((field, value) => {
    const errors = { ...fieldErrors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) errors.name = "Name is required";
        else if (value.trim().length < 2) errors.name = "Name must be at least 2 characters";
        else errors.name = "";
        break;
        
      case 'email':
        if (!value.trim()) errors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value)) errors.email = "Please enter a valid email address";
        else errors.email = "";
        break;
        
      case 'password':
        if (!value) {
          errors.password = "Password is required";
          setPasswordStrength(0);
          setPasswordRequirements({
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false
          });
        } else {
          // Calculate strength without complex regex on every keystroke
          let strength = 0;
          const requirements = {
            length: value.length >= 8,
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /\d/.test(value),
            special: /[@$!%*?&]/.test(value)
          };
          
          if (requirements.length) strength += 20;
          if (requirements.lowercase) strength += 20;
          if (requirements.uppercase) strength += 20;
          if (requirements.number) strength += 20;
          if (requirements.special) strength += 20;
          
          setPasswordStrength(strength);
          setPasswordRequirements(requirements);
          
          if (strength < 100) {
            const missing = [];
            if (!requirements.length) missing.push("8 characters");
            if (!requirements.lowercase) missing.push("lowercase letter");
            if (!requirements.uppercase) missing.push("uppercase letter");
            if (!requirements.number) missing.push("number");
            if (!requirements.special) missing.push("special character");
            errors.password = `Needs: ${missing.join(", ")}`;
          } else {
            errors.password = "";
          }
        }
        break;
        
      case 'confirmPassword':
        if (!value) errors.confirmPassword = "Please confirm your password";
        else if (value !== password) errors.confirmPassword = "Passwords do not match";
        else errors.confirmPassword = "";
        break;
    }
    
    setFieldErrors(errors);
  }, [fieldErrors, password]);

  // ✅ OPTIMIZED: Debounced validation using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password) {
        validateField('password', password);
      }
    }, 300); // 300ms delay for password validation
    
    return () => clearTimeout(timer);
  }, [password, validateField]);

  // ✅ OPTIMIZED: Handle input changes
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateField('name', value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Don't validate immediately - useEffect will handle it
    if (confirmPassword) {
      validateField('confirmPassword', confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateField('confirmPassword', value);
  };

  // ✅ Form validation before submit
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (passwordStrength < 100) {
      errors.password = "Please meet all password requirements";
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
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

  // ✅ Get strength color
  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white font-sans">
      {/* ================= LEFT — REGISTER ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20">
        <div className="w-full max-w-md space-y-10">
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
                  onChange={handleNameChange}
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border ${
                    fieldErrors.name ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
                  } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
                />
              </div>
              {fieldErrors.name && (
                <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.name}</p>
              )}
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
                  onChange={handleEmailChange}
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border ${
                    fieldErrors.email ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
                  } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.email}</p>
              )}
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
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border ${
                    fieldErrors.password ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
                  } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password strength indicator - Only show when typing */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Password strength</span>
                    <span className="text-xs font-medium text-gray-700">{passwordStrength}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
              
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.password}</p>
              )}
              
              {/* Password requirements - Only show when typing */}
              {password && (
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{passwordRequirements.length ? '✓' : '○'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{passwordRequirements.lowercase ? '✓' : '○'}</span>
                    One lowercase letter
                  </li>
                  <li className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{passwordRequirements.uppercase ? '✓' : '○'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{passwordRequirements.number ? '✓' : '○'}</span>
                    One number
                  </li>
                  <li className={`flex items-center ${passwordRequirements.special ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{passwordRequirements.special ? '✓' : '○'}</span>
                    One special character (@$!%*?&)
                  </li>
                </ul>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border ${
                    fieldErrors.confirmPassword ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-blue-500/10"
                  } focus:bg-white focus:ring-4 focus:border-blue-500 outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 px-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl
                         font-bold text-lg shadow-xl shadow-blue-600/30
                         active:scale-[0.97] transition-all flex items-center justify-center gap-2
                         disabled:opacity-70 disabled:cursor-not-allowed"
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

      {/* ================= RIGHT — HERO ================= */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2BFF] via-[#153EFF] to-[#1B1F6A]" />

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px]
                          bg-fuchsia-400/80 rounded-full blur-[80px]
                          mix-blend-screen" />

          <div className="absolute top-[25%] right-[10%] w-[460px] h-[460px]
                          bg-cyan-300/80 rounded-full blur-[90px]
                          mix-blend-screen" />

          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px]
                          bg-indigo-400/80 rounded-full blur-[100px]
                          mix-blend-screen" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-14 max-w-xl">
          <div className="inline-flex p-6 rounded-3xl bg-white/15 backdrop-blur-xl mb-12">
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
